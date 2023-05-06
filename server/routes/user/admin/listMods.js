const express = require('express')
const { userModel } = require('@/model/user')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */

module.exports = (req, res) => {
    const { isReporter, isRoot, canPublish } = req.query

    const roleFilter = { roles: { $exists: true } }
    if (isReporter) roleFilter['roles.isReporter'] = { $exists: true }
    if (canPublish) roleFilter['roles.canPublish'] = { $exists: true }
    if (isRoot) roleFilter['roles.isRoot'] = { $exists: true }

    userModel.find(
        roleFilter,
        { _id: true, name: true, email: true, roles: true },
        (e, d) => {
            console.log(d, e)
            if (e) res.status(500).json({ message: 'Something went wrong' })
            res.json({ message: 'success', data: d })
        }
    )
}
