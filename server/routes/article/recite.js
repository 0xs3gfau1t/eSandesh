const article = require('../../model/article')
const path = require('path')
const audioAdFolder = path.resolve(__dirname, '../../assets/')
const fs = require('fs')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (_req, _res) => {
    const { articleId } = _req.body

    article.findOne({ _id: articleId }, (e, d) => {
        if (e) return _res.json({ error: 'No such article found' })

        const content = d.title
        const https = require('follow-redirects').https
        const options = {
            method: 'POST',
            hostname: 'app.micmonster.com',
            path: '/restapi/create',
            headers: {},
            maxRedirects: 20,
        }

        const req = https.request(options, function (res) {
            const chunks = []

            res.on('data', function (chunk) {
                chunks.push(chunk)
            })
            res.on('end', function (chunk) {
                const body = Buffer.concat(chunks)
                try {
                    fs.readFile(audioAdFolder + '/ad.mp3', (e, ad) => {
                        if (e) throw Error('Cannot read ad file')

                        const decodedBody = Buffer.from(
                            body.toString(),
                            'base64'
                        )
                        const concatenated = Buffer.concat(
                            [ad, decodedBody],
                            ad.length + decodedBody.length
                        )
                        return _res.send(concatenated)
                    })
                } catch (e) {
                    _res.json({
                        error: 'Something went wrong while appending ad',
                    })
                }
            })

            res.on('error', function (error) {
                _res.json({ error: 'Error while converting to audio' })
            })
        })

        const postData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="locale"\r\n\r\nne-NP\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="content"\r\n\r\n<voice name="ne-NP-SagarNeural">${content}</voice>\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="ip"\r\n\r\n202.51.80.138\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--`

        req.setHeader(
            'content-type',
            'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        )

        req.write(postData)
        req.end()
    })
}
