const sendPasswordResetMail = require('@/controllers/sendPasswordResetMail')
const { userModel } = require('@/model/user')
const { hashSync } = require('bcryptjs')
const express = require('express')
const { sign, verify } = require('jsonwebtoken')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const requestPasswordReset = async (req, res) => {
    const { email } = req.query
    if (!email)
        return res.status(400).json({ error: 'Email field is missing.' })

    try {
        const validUser = await userModel.exists({ email })
        if (!validUser)
            return res.status(400).json({ error: 'User not found.' })

        const token = sign({ email }, process.env.ESANDESH_KEY || 'secret', {
            expiresIn: '1d',
        })

        const params = new URLSearchParams()
        params.set('token', token)
        const url =
            process.env.DOMAIN_URL + '/forgotPassword?' + params.toString()

        const { success } = await sendPasswordResetMail({ url, email })

        if (success)
            return res.status(200).json({
                success: true,
                message: `Reset mail has been sent to ${email}`,
            })
        else
            return res.status(400).json({
                success: false,
                message: 'Failed to send reset mail.',
            })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const processPasswordReset = async (req, res) => {
    const { token, password } = req.body
    if (!token || !password)
        return res
            .status(400)
            .json({ error: 'Either token or password is missing.' })

    try {
        const data = verify(token, process.env.ESANDESH_KEY || 'secret')
        const hashedPassword = hashSync(password, 10)
        await userModel.updateOne(
            { email: data.email },
            { password: hashedPassword }
        )
        return res
            .status(200)
            .json({ success: true, message: 'Password successfully changed.' })
    } catch (err) {
        if (err.message?.includes('jwt expired'))
            return res.status(400).json({ error: 'Token expired.' })

        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = { requestPasswordReset, processPasswordReset }
