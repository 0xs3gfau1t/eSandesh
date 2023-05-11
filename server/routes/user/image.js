const { userModel } = require('@/model/user')
const express = require('express')
const { default: mongoose } = require('mongoose')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getImage = async (req, res) => {
    const id = req.query.id || req.session?.user?.id
    try {
        const { imageBuffer } = await userModel.findOne(
            { _id: mongoose.Types.ObjectId(id) },
            { imageBuffer: true, _id: false }
        )

        if (!imageBuffer) return res.status(400).end()

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length,
        })

        return res.end(imageBuffer)
    } catch (err) {
        console.error(err)
        return res.status(500).end()
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const postImage = async (req, res) => {
    const { image } = req.files
    if (image.size > 2 * 1024 * 1024)
        return res
            .status(413)
            .json({ error: 'Image cannot be larger than 2MiB.' })

    if (!image.mimetype.includes('image'))
        return res.status(415).json({ error: 'File must be an image.' })

    try {
        await userModel.updateOne(
            {
                _id: mongoose.Types.ObjectId(req.session?.user?.id),
            },
            {
                imageBuffer: image.data,
                image: `/api/user/image?id=${req.session?.user?.id}`,
            }
        )
        return res.json({ message: 'success' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = { getImage, postImage }
