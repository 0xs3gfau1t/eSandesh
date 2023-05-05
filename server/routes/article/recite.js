const express = require('express')
const crypto = require('crypto')
const { ObjectId } = require('mongodb')
const { Readable } = require('stream')
const adsModel = require('@/model/ads')
const articleModel = require('@/model/article')

const CHUNK_SIZE = 1024 * 1024
const HEADER_SIZE = 44

// Helper function to convert hex
// string to little endian form
const toLittleEndian = hexStr =>
    hexStr[6] +
    hexStr[7] +
    hexStr[4] +
    hexStr[5] +
    hexStr[2] +
    hexStr[3] +
    hexStr[0] +
    hexStr[1]

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
module.exports = async (req, res) => {
    const range = req.headers.range
    if (!range) return res.status(400).send('Requires Range header')

    const { key } = req.query

    // Decrypt key to produce data
    var audioKey
    if (!process.env.AUDIO_KEY) {
        console.debug('[!] AUDIO_KEY not found in env')
        console.debug(
            '[!] Using default AUDIO_KEY. Create one with `openssl -rand base64 32`'
        )
        audioKey = 'w+0s8w5H1oqlw5/3uCqDIDGUQ6RcJ0QFWXTm/5t+R98='
    } else {
        audioKey = process.env.AUDIO_KEY
    }
    const secret = Buffer.from(audioKey, 'base64')
    const decipher = crypto.createDecipheriv('aes-256-ecb', secret, null)
    const decrypted = Buffer.concat([
        decipher.update(key, 'base64'),
        decipher.final(),
    ])

    const audioPaths = JSON.parse(decrypted.toString())
    let audioSizes = await adsModel.aggregate([
        { $match: { _id: { $in: audioPaths.map(i => ObjectId(i)) } } },
        {
            $project: {
                dataSize: { $binarySize: '$audio' },
                _id: { $toString: '$_id' },
            },
        },
    ])
    audioSizes.push(
        ...(await articleModel.aggregate([
            { $match: { _id: { $in: audioPaths.map(i => ObjectId(i)) } } },
            {
                $project: {
                    dataSize: { $binarySize: '$audio' },
                    _id: { $toString: '$_id' },
                },
            },
        ]))
    )
    audioSizes = audioPaths.map(path => audioSizes.find(x => x._id == path))
    const totalSize = audioSizes.reduce(
        (accum, value) => accum + value?.dataSize,
        0
    )

    const start = Number(range.replace(/\D/g, ''))

    // If requesting for the first bytes
    // then create wav file headers
    // For reference check the following site
    // https://sites.google.com/site/musicgapi/technical-documents/wav-file-format
    if (start == 0) {
        const wavHeader = Buffer.alloc(HEADER_SIZE)

        wavHeader.write('RIFF', 0) // RIFF chunk id
        wavHeader.write(
            toLittleEndian((totalSize + 36).toString(16).padStart(8, '0')),
            4,
            'hex'
        ) // RIFF chunk size: total file size - 8 or data chunk size + 36
        wavHeader.write('WAVE', 8) // RIFF chunk type
        wavHeader.write('fmt ', 12) // fmt chunk id
        wavHeader.write('10000000', 16, 'hex') // fmt chunk size
        wavHeader.write('0100', 20, 'hex') // Compression code: 1
        wavHeader.write('0100', 22, 'hex') // Number of channels: 1
        wavHeader.write('80bb0000', 24, 'hex') // Sample rate: 48000
        wavHeader.write('00770100', 28, 'hex') // Average bytes per seconds: 96000
        wavHeader.write('0200', 32, 'hex') // Block Align: 2
        wavHeader.write('1000', 34, 'hex') // Significant bits per sample: 16
        wavHeader.write('data', 36) // data chunk id
        wavHeader.write(
            toLittleEndian(totalSize.toString(16).padStart(8, '0')),
            40,
            'hex'
        ) // data chunk size

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${HEADER_SIZE - 1}/${
                totalSize + HEADER_SIZE
            }`,
            'Accept-Ranges': 'bytes',
            'Content-Length': HEADER_SIZE,
            'Content-Type': 'audio/wav',
        })

        return Readable.from(wavHeader).pipe(res)
    }

    // If not requesting first bytes
    // then send data chunks from the file array

    let selectedFileIdx, offset
    // TODO: make generic way to find selectedFileIdx
    if (start < audioSizes[0].dataSize) {
        selectedFileIdx = 0
        offset = HEADER_SIZE
    } else if (start < audioSizes[0].dataSize + audioSizes[1].dataSize) {
        selectedFileIdx = 1
        offset = HEADER_SIZE + audioSizes[0].dataSize
    } else {
        selectedFileIdx = 2
        offset = HEADER_SIZE + audioSizes[0].dataSize + audioSizes[1].dataSize
    }

    const end = Math.min(
        start + CHUNK_SIZE - 1,
        offset + audioSizes[selectedFileIdx].dataSize - 1
    )
    const contentLength = end - start + 1

    res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize + HEADER_SIZE}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'audio/wav',
    })
    //
    // Tried fetching just the required chunk to reduce server memory footprint for this request
    // $slice on BinData didn't work
    // Always returned first X bytes of data of respective audio
    //
    let stream
    if (selectedFileIdx != 1)
        stream = await adsModel.findOne(
            { _id: ObjectId(audioSizes[selectedFileIdx]._id) },
            {
                audio: 1,
            }
        )
    else
        stream = await articleModel.findOne(
            { _id: ObjectId(audioSizes[selectedFileIdx]._id) },
            {
                audio: 1,
            }
        )
    res.write(
        stream.audio.slice(start - offset, start - offset + contentLength)
    )
}
