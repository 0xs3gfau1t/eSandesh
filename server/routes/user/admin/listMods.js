const express = require('express')
/*
 * @param {express.Requsst}req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { isRoot } = req.session?.user?.roles?.isRoot

    if (!isRoot)
        return res
            .status(403)
            .json({ message: 'Not enough privilage to perform this action' })

    res.json({ message: 'Success' })
}
