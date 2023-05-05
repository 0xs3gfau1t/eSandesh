const Ffmpeg = require('fluent-ffmpeg')
const { Readable, Writable } = require('stream')

module.exports = function (data) {
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
    return new Promise((resolve, reject) => {
        Ffmpeg(Readable.from(data))
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
                console.log('[+] Successfully converted audio to raw format')
                resolve(Buffer.concat(buffer))
            })
            .run()
    })
}
