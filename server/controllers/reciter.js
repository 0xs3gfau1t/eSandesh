const path = require('path')
const fs = require('fs')

const audioArticleFolder = path.resolve(__dirname, '../assets/article/audio/')

module.exports = async ({ title, content, id, ip }) => {
    try {
        const body = new FormData()
        body.append('locale', 'ne-NP')
        body.append(
            'content',
            '<voice name="ne-NP-SagarNeural">' +
                title +
                '\n' +
                content +
                '</voice>'
        )
        body.append('ip', '8.8.8.8')

        const sound = await fetch('https://app.micmonster.com/restapi/create', {
            method: 'POST',
            body,
        })
            .then(res => res.text())
            .then(base64Str => new Buffer.from(base64Str, 'base64'))
            .catch(err => console.error('Error when reciting: ', err))

        const fileName = audioArticleFolder + '/' + id + '.mp3'
        fs.writeFileSync(fileName, sound)
        return { fileName }
    } catch (err) {
        console.error(err)
        return { fileName: null }
    }
}
