const articleModel = require('../../model/article')
const path = require('path')
const audioAdFolder = path.resolve(__dirname, '../../assets/')
const fs = require('fs')
const { JSDOM } = require('jsdom')
const express = require('express')

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { year, month, slug } = req.query

    try {
        const article = await articleModel.findOne({ year, month, slug })

        if (!article) return res.json({ error: 'No such article found' })

        const dom = new JSDOM(article.content)
        const content = dom.window.document.querySelector('body').textContent

        const body = new FormData()
        body.append('locale', 'ne-NP')
        body.append(
            'content',
            '<voice name="ne-NP-SagarNeural">' +
                article.title +
                '\n' +
                content +
                '</voice>'
        )
        body.append('ip', req.ip)

        const sound = await fetch('https://app.micmonster.com/restapi/create', {
            method: 'POST',
            body,
        })
            .then(res => res.text())
            .then(base64Str => new Buffer.from(base64Str, 'base64'))

        const ad = fs.readFileSync(audioAdFolder + '/ad.mp3')
        const concatenated = Buffer.concat([ad, sound])

        return res.send({
            message: 'success',
            audio: concatenated.toString('base64'),
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
