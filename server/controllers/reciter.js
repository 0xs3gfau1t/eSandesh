const path = require('path')

const audioArticleFolder = path.resolve(__dirname, '../assets/article/audio/')

const Ffmpeg = require('fluent-ffmpeg')
const { Readable } = require('stream')

module.exports = async ({ title, content, id }) => {
    const body = new FormData()
    body.append('locale', 'ne-NP')
    body.append(
        'content',
        '<voice name="ne-NP-SagarNeural">' + title + '\n' + content + '</voice>'
    )
    body.append('ip', '8.8.8.8')

    const fileName = id + '.raw'

    return new Promise(async (resolve, reject) => {
        const soundBuffer = await fetch(
            'https://app.micmonster.com/restapi/create',
            {
                method: 'POST',
                body,
            }
        )
            .then(res => res.text())
            .then(base64Str => new Buffer.from(base64Str, 'base64'))
            .catch(err => console.error('Error when reciting: ', err))

        const soundStream = new Readable()
        soundStream.push(soundBuffer)
        soundStream.push(null)

        // No matter what the file type is
        // Convert the audio to raw format
        // with 48000 sample rate, 1 channel
        // and 16bit for one sample size
        Ffmpeg(soundStream)
            .on('start', cmd => {
                console.log('Started ffmpeg with the command:', cmd)
            })
            .on('error', e => {
                console.error(e)
                reject('[x] Cannot convert audio article to raw format')
            })
            .on('end', () => {
                console.log('[+] Successfully converted audio to raw format')
                resolve({ fileName })
            })
            .format('s16le')
            .audioCodec('pcm_s16le')
            .audioFrequency(48000)
            .audioChannels(1)
            .output(AUDIO_AD_FOLDER + '/' + fileName)
            .run()
    })
}
