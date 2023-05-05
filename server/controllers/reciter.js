const uploadAudio = require('@/controllers/uploadController')

module.exports = async ({ title, content, id }) => {
    const body = new FormData()
    body.append('locale', 'ne-NP')
    body.append(
        'content',
        '<voice name="ne-NP-SagarNeural">' + title + '\n' + content + '</voice>'
    )
    body.append('ip', '8.8.8.8')

    return new Promise(async (resolve, reject) => {
        const soundBuffer = {
            name: title,
            data: await fetch('https://app.micmonster.com/restapi/create', {
                method: 'POST',
                body,
            })
                .then(res => res.text())
                .then(base64Str => new Buffer.from(base64Str, 'base64'))
                .catch(err => reject('Error when reciting: ', err)),
        }

        console.log('Passing sound buffer: ', soundBuffer)
        const [, audioId] = await uploadAudio(
            undefined,
            undefined,
            undefined,
            soundBuffer
        )
        resolve(audioId)
    })
}
