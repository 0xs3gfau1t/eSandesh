const { userModel } = require('../model/user')

const updateHistory = async ({ req, res }) => {
    res.cookie('user', JSON.stringify(req.cookies.user), {
        httpOnly: true,
        sameSite: 'lax',
    })

    if (req.session) {
        await userModel.updateOne(
            { _id: req.session.user.id },
            { history: req.cookies.user.history }
        )
    }
}

module.exports = updateHistory
