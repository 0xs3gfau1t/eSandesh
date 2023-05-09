module.exports = image => {
    const imageTypeHeader = image.toString('hex', 0, 4)
    let width, height
    if (imageTypeHeader === '89504e47') {
        // PNG image
        width = image.readUInt32BE(16)
        height = image.readUInt32BE(20)
    } else if (imageTypeHeader === '47494638') {
        // GIF image
        width = image.readUInt16LE(6)
        height = image.readUInt16LE(8)
    } else if (
        imageTypeHeader === 'ffd8ffe0' ||
        imageTypeHeader === 'ffd8ffe1'
    ) {
        // JPEG image
        let i = 4
        while (i < image.length) {
            const segmentLength = image.readUInt16BE(i)
            i += segmentLength
            if (i >= image.length || image[i] !== 0xff) {
                break
            }
            const marker = image[i + 1]
            if (marker === 0xc0 || marker === 0xc1) {
                // Found the SOF0 or SOF1 marker
                height = image.readUInt16BE(i + 5)
                width = image.readUInt16BE(i + 7)
                break
            }
            i += 2
        }
    }
    console.log('Width: ', width, 'Height: ', height)
    return { width, height }
}
