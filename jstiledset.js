class JSTiledSet {
    constructor() {
        this.data = {
            firstgid: 0,
            name: "",
            tilewidth: 0,
            tileheight: 0,
            margin: 0,
            spacing: 0,
            image: "",
            imagewidth: 0,
            imageheight: 0,
            columns: 0,
            tilecount: 0
        }
        this.tiles = []
        this.hashes = []
    }

    load(json) {
        const fs = require('fs')
        try {
            const jsonString = fs.readFileSync(json, 'utf8')
            this.data = JSON.parse(jsonString)
        } catch (error) {
            console.error(error)
        }
    }

    save(json) {
        const fs = require('fs')
        const jsonString = JSON.stringify(this.data, null, 4)
        fs.writeFileSync(json, jsonString, (err) => {
            if (err) {
                throw err;
            }
        })
    }

    async import(png, tilewidth, tileheight, margin, spacing, tilecount, firstgid) {
        const Jimp = require('jimp')
        await Jimp.read(png)
            .then(image => {
                const imagewidth = image.getWidth()
                const imageheight = image.getHeight()
                const columns = Math.floor((imagewidth+margin)/(tilewidth+spacing))
                const rows = Math.min(Math.floor((imageheight+margin)/(tileheight+spacing)), Math.ceil(tilecount/columns))
                let count = 0
                while (count < tilecount) {
                    let row = Math.floor(count / columns)
                    let col = count - (row * columns)
                    if (row >= rows) {
                        break
                    }

                    let tile = image.clone().crop(col*tilewidth, row*tileheight, tilewidth, tileheight)
                    this.tiles.push(tile)
                    this.hashes.push(tile.hash())

                    count++
                }
                this.data = {
                    firstgid: firstgid,
                    name: png,
                    tilewidth: tilewidth,
                    tileheight: tileheight,
                    margin: margin,
                    spacing: spacing,
                    image: png,
                    imagewidth: imagewidth,
                    imageheight: imageheight,
                    columns: columns,
                    tilecount: tilecount
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
}

module.exports = JSTiledSet

