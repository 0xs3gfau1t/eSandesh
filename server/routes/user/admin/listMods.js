const express = require('express')
const { userModel } = require('@/model/user')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */

module.exports = (req, res) => {
    const { isReporter, isRoot, isPublisher } = req.query

    const roleFilter = { role: true }
    if (isReporter) roleFilter['role.isReporter'] = true
    if (isPublisher) roleFilter['role.isPublisher'] = true
    if (isRoot) roleFilter['role.isRoot'] = true

    userModel.find({ $exists: roleFilter }, (e, d) => {
        console.log(d, e)
        if (e) res.status(500).json({ message: 'Something went wrong' })
        res.json({ message: 'success', data: d })
    })
}
