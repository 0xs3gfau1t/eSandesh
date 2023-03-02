const fs = require('fs')
const { randomUUID } = require('crypto')

function getExt(resource) {
    console.log('resource: ', resource)
    return '.' + resource.mimetype.split('/')[1]
}

module.exports = function uploadAdAssets(imageX, imageY, imageSq, audio) {
    //
    // Provide custom random uuid instead of using name
    // Because name has to be sanitized for path injection vulnerability counter measures
    // Intentionally haven't used 'sanitize-filename' to be safe
    //
    let imageXUrl = undefined
    let imageYUrl = undefined
    let imageSqUrl = undefined
    let audioUrl = undefined

    if (imageX) {
        imageXUrl = randomUUID() + getExt(imageX)
        fs.writeFileSync('./assets/ads/images/' + imageXUrl, imageX.data)
    }
    if (imageY) {
        imageYUrl = randomUUID() + getExt(imageY)
        fs.writeFileSync('./assets/ads/images/' + imageYUrl, imageY.data)
    }
    if (imageSq) {
        imageSqUrl = randomUUID() + getExt(imageSq)
        fs.writeFileSync('./assets/ads/images/' + imageSqUrl, imageSq.data)
    }
    if (audio) {
        audioUrl = randomUUID() + getExt(audio)
        fs.writeFileSync('./assets/ads/audio/' + audioUrl, audio.data)
    }
    return [
        { rectX: imageXUrl, rectY: imageYUrl, square: imageSqUrl },
        audioUrl,
    ]
}
