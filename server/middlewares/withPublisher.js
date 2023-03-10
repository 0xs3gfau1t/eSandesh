const express = require('express')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = (req, res, next) => {
    try {
        const { canPublish, isRoot } = req.session?.user?.roles

        if (canPublish || isRoot) return next()

        throw Error('Not a valid user')
    } catch (e) {
        return res.status(403).json({
            message:
                'You must either be Publisher or Root to perform this action. Incident will be reported.',
        })
    }
}
