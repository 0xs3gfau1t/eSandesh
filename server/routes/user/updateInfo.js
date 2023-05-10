const { userModel } = require('@/model/user')
const { hashSync, compareSync } = require('bcryptjs')
const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateInfo = async (req, res) => {
    const { name, password, currentPassword } = req.body

    let update = {}

    if (name) update.name = name
    if (password) {
        const { password: hashedPassword } = await userModel.findOne(
            { _id: req.session?.user?.id },
            { _id: 0, password: 1 }
        )

        if (!compareSync(currentPassword, hashedPassword))
            return res
                .status(400)
                .json({ error: 'Incorrect current password.' })

        update.password = hashSync(password, 10)
    }

    if (Object.keys(update).length == 0)
        return res.status(400).json({ error: 'Nothing to update.' })

    try {
        await userModel.updateOne({ _id: req.session.user?.id }, update)
        return res.status(200).json({ message: 'success' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: 'Something went wrong',
        })
    }
}

module.exports = updateInfo
