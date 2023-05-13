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

    try {
        let userInfo
        if (id == req.session?.user?.id) {
            userInfo = await userModel.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id),
                    },
                },
                {
                    $project: {
                        name: true,
                        image: true,
                        email: true,
                        roles: { $ifNull: ['$roles', []] },
                    },
                },
                {
                    $lookup: {
                        from: 'accounts',
                        localField: '_id',
                        foreignField: 'userId',
                        pipeline: [{ $project: { provider: true } }],
                        as: 'accounts',
                    },
                },
            ])
        } else {
            userInfo = await userModel.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(id) } },
                { $project: { name: 1, image: 1 } },
            ])
        }

        return res
            .status(200)
            .json({ message: 'success', userInfo: userInfo[0] })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: 'Something went wrong',
        })
    }
}

module.exports = getInfo
