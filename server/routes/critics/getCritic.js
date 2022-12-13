const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { id } = req.query

    criticModel.findOne({ _id: id }, (e, d) => {
        if (e || !d)
            return res.status(404).json({ error: 'No such record found' })

        res.json({ message: 'success', doc: d })
    })
}
