const normalPricePerMinute = 100
const midPriority = 5

module.exports = function calculateAdPrice({ popup, expiry, priority, audio }) {
    const minutesLeft = (new Date(expiry) - new Date()) / (1000 * 60)

    // We can do better here by analyzing which category the ad falls
    // Then check performance of this category in db
    // Then adjust the formula to adjust price by
    // considering how much users click the ad
    const audioPriceAdjustmentFactor = audio ? 1.5 : 1
    return Math.round(
        ((minutesLeft * normalPricePerMinute * priority) / midPriority) *
            (audioPriceAdjustmentFactor + Boolean(popup) * 2)
    )
}
