module.exports = async function generateSummary(content) {
    const url =
        process.env.SUMM_HOST + ':' + process.env.SUMM_PORT + '/api/summary'
    console.log(url)
    let body = new FormData()
    body.append('text', content)
    let summary = { summary: content.slice(0, 150) }
    try {
        summary = await fetch(url, {
            method: 'POST',
            body: body,
        }).then(r => r.text())
        return summary
    } catch (e) {
        console.error(e)
    }

    return summary.summary
}
