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
                        password: {
                            $cond: {
                                if: {
                                    $eq: [
                                        {
                                            $ifNull: ['$password', ''],
                                        },
                                        '',
                                    ],
                                },
                                then: 0,
                                else: 1,
                            },
                        },
                        roles: { $ifNull: ['$roles', []] },
                    },
                },
                {
                    $lookup: {
                        from: 'accounts',
                        localField: '_id',
                        foreignField: 'userId',
                        pipeline: [
                            { $match: { provider: 'google' } },
                            { $project: { _id: true } },
                        ],
                        as: 'google',
                    },
                },
                { $set: { google: { $size: '$google' } } },
            ])
            Object.keys(userInfo[0].roles).forEach(role => {
                if (userInfo[0].roles[role] == false)
                    delete userInfo[0].roles[role]
            })
        } else {
            userInfo = await userModel.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'users',
                        let: { id: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    _id: mongoose.Types.ObjectId(
                                        req.session?.user?.id
                                    ),
                                },
                            },
                            {
                                $project: {
                                    _id: false,
                                    subscribed: {
                                        $cond: [
                                            { $in: ['$$id', '$subscriptions'] },
                                            true,
                                            false,
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'subscribed',
                    },
                },
                {
                    $unwind: {
                        path: '$subscribed',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        name: 1,
                        image: 1,
                        subscribed: '$subscribed.subscribed',
                    },
                },
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
