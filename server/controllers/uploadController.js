const fs = require('fs')
const { randomUUID } = require('crypto')

module.exports = function uploadAdAssets(imageX, imageY, imageSq, audio) {
    //
    // TODO: Sanitize and use filename instead of random uuid
    // Provide custom random uuid instead of using name
    // Because name has to be sanitized for path injection vulnerability counter measures
    //
    let imageXUrl = undefined
    let imageYUrl = undefined
    let imageSqUrl = undefined
    let audioUrl = undefined

    if (imageX) {
        imageXUrl = randomUUID()
        fs.writeFileSync('./assets/ads/images/' + imageXUrl, imageX.data)
    }
    if (imageY) {
        imageYUrl = randomUUID()
        fs.writeFileSync('./assets/ads/images/' + imageYUrl, imageY.data)
    }
    if (imageSq) {
        imageSqUrl = randomUUID()
        fs.writeFileSync('./assets/ads/images/' + imageSqUrl, imageSq.data)
    }
    if (audio) {
        audioUrl = randomUUID()
        fs.writeFileSync('./assets/ads/audio/' + audioUrl, audio.data)
    }
    return [
        { rectX: imageXUrl, rectY: imageYUrl, square: imageSqUrl },
        audioUrl,
    ]
}
