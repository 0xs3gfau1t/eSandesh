const { userModel } = require('@/model/user')
const express = require('express')
const { JSDOM } = require('jsdom')
const { default: mongoose } = require('mongoose')

const VALID_RASHIFAL = [
    'Mesh',
    'Mithun',
    'Singha',
    'Tula',
    'Dhanu',
    'Kumbha',
    'Brish',
    'Karkat',
    'Kanya',
    'Brischik',
    'Makar',
    'Meen',
]

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getRashifal = async (req, res) => {
    try {
        const { rashifal } = await userModel.findOne(
            { _id: mongoose.Types.ObjectId(req.session?.user?.id) },
            { rashifal: true }
        )

        if (!rashifal)
            return res
                .status(400)
                .json({ error: 'Set your horoscope from profile setting page' })

        const dom = await JSDOM.fromURL(
            `https://www.hamropatro.com/rashifal/daily/${rashifal}`
        ).then(d => d.window.document)

        const text = dom.querySelector('.desc>p').textContent.trim()
        return res.send(text)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const setRashifal = async (req, res) => {
    const { rashifal } = req.body
    if (!VALID_RASHIFAL.includes(rashifal))
        return res.status(400).json({
            error: `Invalid rashifal value. It should be either of these: [${VALID_RASHIFAL.join(
                ', '
            )}]`,
        })

    try {
        await userModel.updateOne(
            { _id: mongoose.Types.ObjectId(req.session?.user?.id) },
            { $set: { rashifal: rashifal } }
        )
        return res.json({ message: 'Updated rashifal' })
    } catch (err) {
        console.error(err)
    }
}

module.exports = { getRashifal, setRashifal }
