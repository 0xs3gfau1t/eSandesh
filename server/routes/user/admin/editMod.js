const express = require('express')
const { userModel } = require('@/model/user')
/**
 * @param {express.Requsst}req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    // Admin has control only over role attribute of any user
    // This means admin can convert any regular user with registered email
    // To one of moderators
    const { email, isRoot, canPublish, isReporter } = req.body
    // console.log('Body: ', req.body)
    if (!email)
        return res.status(400).json({ message: 'Update requires a updatee' })

    const setRole = { $set: {}, $unset: {} }

    if (isRoot === 'true') setRole['$set']['roles.isRoot'] = isRoot
    else if (isRoot !== undefined) setRole['$unset']['roles.isRoot'] = true

    if (isReporter === 'true') setRole['$set']['roles.isReporter'] = isReporter
    else if (isReporter !== undefined)
        setRole['$unset']['roles.isReporter'] = true

    if (canPublish === 'true') setRole['$set']['roles.canPublish'] = canPublish
    else if (canPublish !== undefined)
        setRole['$unset']['roles.canPublish'] = true

    userModel.findOneAndUpdate(
        { email, emailVerified: { $exists: true } },
        setRole,
        { new: true },
        (e, d) => {
            if (e) {
                // console.log(e, d)
                return res
                    .status(500)
                    .json({ message: 'Something went wrong.' })
            }
            if (!d)
                return res
                    .status(404)
                    .json({ message: 'No such record exists' })
            if (!d.roles.canPublish && !d.roles.isReporter && !d.roles.isRoot) {
                userModel.findOneAndUpdate(
                    { email },
                    { $unset: { roles: true } },
                    (e, d) => {
                        console.log(e, d)
                    }
                )
            }

            res.json({ message: 'success' })
        }
    )
}
