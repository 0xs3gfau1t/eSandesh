const fs = require('fs')
const { Readable } = require('stream')
const { randomUUID } = require('crypto')
const Ffmpeg = require('fluent-ffmpeg')

const IMAGE_AD_FOLDER = './assets/ads/images/'
const AUDIO_AD_FOLDER = './assets/ads/audio/'

function getExt(resource) {
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

    if (imageX) {
        imageXUrl = randomUUID() + getExt(imageX)
        fs.writeFileSync(IMAGE_AD_FOLDER + imageXUrl, imageX.data)
    }
    if (imageY) {
        imageYUrl = randomUUID() + getExt(imageY)
        fs.writeFileSync(IMAGE_AD_FOLDER + imageYUrl, imageY.data)
    }
    if (imageSq) {
        imageSqUrl = randomUUID() + getExt(imageSq)
        fs.writeFileSync(IMAGE_AD_FOLDER + imageSqUrl, imageSq.data)
    }

    return new Promise((resolve, reject) => {
        // TODO: Validate length and size of uploaded audio to 5s, < 2Mb
        if (audio) {
            const audioUrl = randomUUID() + '.mp3'
            if (getExt(audio) !== '.mp3')
                Ffmpeg(Readable.from(audio.data))
                    .output(AUDIO_AD_FOLDER + audioUrl)
                    .audioFrequency(48000)
                    .audioChannels(1)
                    .on('error', e => {
                        console.error(e)
                        reject('[x] Cannot convert audio ad to mp3')
                    })
                    .on('end', () => {
                        console.log('[+] Successfully converted audio to mp3')
                        resolve([
                            {
                                rectX: imageXUrl,
                                rectY: imageYUrl,
                                square: imageSqUrl,
                            },
                            audioUrl,
                        ])
                    })
                    .run()
            else {
                fs.writeFileSync(AUDIO_AD_FOLDER + audioUrl, audio.data)
                resolve([
                    { rectX: imageXUrl, rectY: imageYUrl, square: imageSqUrl },
                    audioUrl,
                ])
            }
        } else
            resolve([
                {
                    rectX: imageXUrl,
                    rectY: imageYUrl,
                    square: imageSqUrl,
                },
                undefined,
            ])
    })
}
