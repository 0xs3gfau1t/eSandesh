const sendRegistartionMail = require('@/controllers/sendRegistrationMail')
const { userModel } = require('@/model/user')
const express = require('express')
const { sign, verify } = require('jsonwebtoken')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const startRegistration = async (req, res) => {
    const { name, email } = req.query
    if (!name || !email)
        return res
            .status(400)
            .json({ error: 'Both name and email must be provided' })

    try {
        const exists = await userModel.exists({ email })
        if (exists)
            return res
                .status(400)
                .json({ error: 'User already registered with this email.' })

        const token = sign(
            { name, email },
            process.env.ESANDESH_KEY || 'secret',
            {
                expiresIn: '6h',
            }
        )
        const params = new URLSearchParams()
        params.set('token', token)
        const url = process.env.DOMAIN_URL + '/register?' + params.toString()

        const { success } = await sendRegistartionMail({ url, email })

        if (success)
            return res.status(200).json({
                success: true,
                message: `Verification mail has been sent to ${email}`,
            })
        else
            return res.status(400).json({
                success: false,
                message: 'Failed to send verification mail.',
            })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Somethhing went wrong' })
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const verifyRegistration = (req, res) => {
    const token = req.body.token
    if (!token) return res.status(400).json({ error: 'Missing token' })

    try {
        const data = verify(token, process.env.ESANDESH_KEY || 'secret')
        return res.json({ name: data.name, email: data.email })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Somethhing went wrong' })
    }
}

module.exports = {
    startRegistration,
    verifyRegistration,
}
