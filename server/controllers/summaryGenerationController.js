module.exports = async function generateSummary(content) {
    const url = process.env.SUMM_HOST + ':' + process.env.SUMM_PORT + '/summary'
    console.log(url)
    let body = new FormData()
    body.append('text', content)
    let summary = { summary: content.slice(0, 150) }
    try {
        summary = await fetch(url, {
            method: 'POST',
            body: body,
        })
        summary = await summary.json()
    } catch (e) {
        console.error(e)
    }

    return summary.summary
}
