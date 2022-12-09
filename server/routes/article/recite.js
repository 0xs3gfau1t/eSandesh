const articleModel = require('../../model/article')
const path = require('path')
const audioAdFolder = path.resolve(__dirname, '../../assets/')
const fs = require('fs')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { id } = req.query

    try {
        const article = await articleModel.findOne({ _id: id })
        if (!article) return res.json({ error: 'No such article found' })

        const body = new FormData()
        body.append('locale', 'ne-NP')
        body.append(
            'content',
            '<voice name="ne-NP-SagarNeural">' + article.title + '</voice>'
        )
        body.append('ip', '194.74.255.198')

        const sound = await fetch('https://app.micmonster.com/restapi/create', {
            method: 'POST',
            body,
        })
            .then(res => res.text())
            .then(base64Str => new Buffer.from(base64Str, 'base64'))

        const ad = fs.readFileSync(audioAdFolder + '/ad.mp3')
        const concatenated = Buffer.concat([ad, sound])

        return res.send(concatenated)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
