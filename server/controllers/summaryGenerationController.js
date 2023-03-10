// Dummy functtion to be integrated with summary model
module.exports = async function generateSummary(content) {
    // return String(content).slice(0, 100)
    const url = process.env.SUMM_HOST + ':' + process.env.SUMM_PORT + '/summary'
    let body = new FormData()
    body.append('text', content)
    summary = await fetch(url, {
        method: 'POST',
        body: body,
    })
        .then(res => res.json())
        .catch(err => console.log(err))

    return summary.summary
}
