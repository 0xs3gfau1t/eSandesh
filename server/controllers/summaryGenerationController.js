// Dummy functtion to be integrated with summary model
module.exports = function generateSummary(content) {
    return String(content).slice(0, 100)
}
