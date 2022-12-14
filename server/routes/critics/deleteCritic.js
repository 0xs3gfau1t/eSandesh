const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { ids } = req.body

    const arrayOfCriticIds = ids
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== '')

    console.log(arrayOfCriticIds)

    criticModel.deleteMany({ _id: { $in: arrayOfCriticIds } }, (e, d) => {
        if (e)
            return res
                .status(400)
                .json({ error: 'Invalid id/ids received. None deleted' })

        res.json({ message: 'success' })
    })
}
