module.exports = async ({ title, content }) => {
    const body = new FormData()
    body.append('locale', 'ne-NP')
    body.append(
        'content',
        '<voice name="ne-NP-SagarNeural">' + title + '\n' + content + '</voice>'
    )
    body.append('ip', '8.8.8.8')

    return new Promise(async (resolve, reject) => {
        fetch('https://app.micmonster.com/restapi/create', {
            method: 'POST',
            body,
        })
            .then(res => res.text())
            .then(base64Str => new Buffer.from(base64Str, 'base64'))
            .then(buffer => resolve(buffer))
            .catch(err => {
                console.error(err)
                reject('Error when reciting: ', err)
            })
    })
}
