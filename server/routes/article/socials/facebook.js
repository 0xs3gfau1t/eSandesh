const { FB } = require('fb')
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

FB.setAccessToken(accessToken)

module.exports = content => {
    FB.api('/me/feed', 'post', { message: content }, r => {
        if (r.error) {
            console.log(r.error)
            //            throw Error('Cannot post to facebook')
        }
    })
}
