const express = require('express')
const mongoose = require('mongoose')
const { userModel } = require('../../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
module.exports = async (req, res) => {
    const { page = 0, limit = 10 } = req.query

    const { user } = req.session

    const articles = await userModel.aggregate([
        {
            $match: {
                _id: user.id,
            },
        },
        {
            $project: {
                saved: true,
                _id: false,
            },
        },
        {
            $lookup: {
                from: 'Article',
                localField: 'saved',
                foreignField: '_id',
                as: 'articles',
            },
        },
        {
            $project: {
                saved: false,
            },
        },
        {
            $unwind: {
                path: '$articles',
            },
        },
        {
            $project: {
                'articles._id': true,
                'articles.year': true,
                'articles.month': true,
                'articles.slug': true,
                'articles.title': true,
            },
        },
    ])

    res.json({ message: 'success', articles: articles })
}
