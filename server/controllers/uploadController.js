const { Readable, Writable } = require('stream')
const { randomUUID } = require('crypto')
const Ffmpeg = require('fluent-ffmpeg')
const audioModel = require('@/model/audio')

module.exports = function (imageX, imageY, imageSq, audio) {
    //
    // Provide custom random uuid instead of using name
    // Because name has to be sanitized for path injection vulnerability counter measures
    // Intentionally haven't used 'sanitize-filename' to be safe
    //
    let imageXUrl = undefined
    let imageYUrl = undefined
    let imageSqUrl = undefined

    if (imageX) {
        imageXUrl = randomUUID()
    }
    if (imageY) {
        imageYUrl = randomUUID()
    }
    if (imageSq) {
        imageSqUrl = randomUUID()
    }

    return new Promise((resolve, reject) => {
        // TODO: Validate length and size of uploaded audio to 5s, < 2Mb
        if (audio) {
            // No matter what the file type is
            // Convert the audio to raw format
            // with 48000 sample rate, 1 channel
            // and 16bit for one sample size
            const buffer = []
            const stream = new Writable({
                write(chunk, encoding, next) {
                    buffer.push(chunk)
                    next()
                },
            })
            Ffmpeg(Readable.from(audio.data))
                .format('s16le')
                .audioCodec('pcm_s16le')
                .audioFrequency(48000)
                .audioChannels(1)
                .output(stream, { end: true })
                .on('error', e => {
                    console.error(e)
                    reject('[x] Cannot convert audio ad to raw format')
                })
                .on('end', () => {
                    console.log(
                        '[+] Successfully converted audio to raw format'
                    )
                    const audioDoc = audioModel({
                        name: audio.name,
                        data: Buffer.concat(buffer),
                    })
                    audioDoc.save()

                    resolve([
                        {
                            rectX: imageXUrl,
                            rectY: imageYUrl,
                            square: imageSqUrl,
                        },
                        audioDoc._id,
                    ])
                })
                .run()
        } else
            resolve([
                {
                    rectX: imageXUrl,
                    rectY: imageYUrl,
                    square: imageSqUrl,
                },
                undefined,
            ])
    })
}
