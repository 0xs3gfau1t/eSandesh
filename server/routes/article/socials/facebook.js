const { FB } = require('fb')
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

FB.setAccessToken(accessToken)

module.exports = content => {
    const message =
        content.title + '\n\n' + content.summary + '\n\n' + content.link
    FB.api('/me/feed', 'post', { message }, r => {
        console.log('R: ', r)
        if (r.error) {
            console.error(r.error)
            //            throw Error('Cannot post to facebook')
        }
    })
}
