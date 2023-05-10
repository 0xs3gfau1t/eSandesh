const { userModel } = require('@/model/user')
const express = require('express')
const { default: mongoose } = require('mongoose')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getInfo = async (req, res) => {
    const id = req.query.id || req.session?.user?.id

    if (!id) return res.status(400).json({ error: 'Invalid user id' })

    let projection = { name: 1, image: 1 }
    if (id == req.session?.user?.id) {
        projection.email = 1
        projection.roles = 1
    }

    try {
        const userInfo = await userModel.findOne(
            { _id: mongoose.Types.ObjectId(id) },
            projection
        )

        return res.status(200).json({ message: 'success', userInfo })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: 'Something went wrong',
        })
    }
}

module.exports = getInfo
