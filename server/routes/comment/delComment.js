const express = require('express')
const { default: mongoose } = require('mongoose')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const delComment = async (req, res) => {
    const { id } = req.body
    const { user } = req.session

    try {
        const subComments = await commentModel.aggregate([
            [
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id),
                        user: mongoose.Types.ObjectId(user.id),
                    },
                },
                {
                    $graphLookup: {
                        from: 'comments',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'parentComment',
                        as: 's',
                    },
                },
                {
                    $unwind: {
                        path: '$s',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: false,
                        id: '$s._id',
                    },
                },
            ],
        ])

        const toDelete = subComments.map(x => x.id)
        toDelete.push(id)

        await commentModel.deleteMany({ _id: { $in: toDelete } })
        return res.json({ message: 'success', toDelete })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = delComment
