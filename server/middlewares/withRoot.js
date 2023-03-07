const express = require('express')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = (req, res, next) => {
    if (req.session?.user?.roles?.isRoot) return next()

    return res.status(403).json({
        message:
            'Not enough privilege to perform this action. Incident will be reported.',
    })
}
