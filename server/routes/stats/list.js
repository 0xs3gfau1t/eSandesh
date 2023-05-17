const express = require('express')
const { default: mongoose } = require('mongoose')
const typeToModelMap = require('./_type_to_model')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const list = async (req, res) => {
    const {
        dateFrom,
        dateTo = new Date(),
        limit = 10,
        skip = 0,
        sortKey = 'createdAt',
        sortOrder = 'desc',
        type,
        id,
        metaId,
    } = req.query

    const model = typeToModelMap[type]
    if (!model)
        return res.status(400).json({
            error:
                'Invalid type. Type must be either of [' +
                Object.keys(typeToModelMap).join(', ') +
                ']',
        })

    const filter = {}
    if (dateFrom)
        filter.createdAt = { $gte: new Date(dateFrom), $lte: new Date(dateTo) }
    if (id) filter.id = mongoose.Types.ObjectId(id)
    if (metaId) filter.metaId = mongoose.Types.ObjectId(metaId)

    try {
        const objList = await model
            .find(filter, { __v: false, updatedAt: false })
            .sort({ [sortKey]: sortOrder == 'desc' ? -1 : 1 })
            .skip(Number(skip))
            .limit(Number(limit))

        return res.json({
            data: objList,
            nextCursor:
                objList.length < Number(limit)
                    ? -1
                    : Number(skip) + objList.length,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = list
