const { userModel } = require('@/model/user')
const express = require('express')
/**
 * @param {express.Request}req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { email, isRoot, isReporter, canPublish } = req.body

    const query = { email }
    const roles = {} 
    if (isRoot === 'true') roles.isRoot = true 
    if (isReporter === 'true') roles.isReporter = isReporter
    if (canPublish === 'true') roles.canPublish = canPublish

    if (Object.keys(roles).length) query.roles = roles

    userModel.findOneAndDelete(query, (e, d) => {
        console.log(e,d)
        if (e) {
            console.log(e, d)
            return res.status(500).json({ message: 'Something went wrong.' })
        }
        if (!d)
            return res.status(404).json({ message: 'No such record exists' })

        res.json({ message: 'success', deletedInfo: d})
    })
}
