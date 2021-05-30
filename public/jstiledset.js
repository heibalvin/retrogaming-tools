'use strict'

class JSTiledSet {
    constructor() {
        this.config = {
            firstgid: 0,
            name: '',
            tilewidth: 0,
            tileheight: 0,
            margin: 0,
            spacing: 0,
            image: 0,
            imagewidth: 0,
            imageheight: 0,
            columns: 0,
            tilecount: 0
        }

        this.tiles = []
        this.hash = []
    }

    load(jsonfile) {
        const fs = require('fs')

        try {
            const jsonstring = fs.readFileSync(jsonfile, 'utf8');
            const json = JSON.parse(jsonstring)

            this.config = json
        } catch (err) {
            console.log(`ERROR: cannot read file from disk: ${jsonfile}`);
        }
    }

    async save(jsonfile) {
        console.log('START: save')
        const fs = require('fs')

        const data = JSON.stringify(this.config, null, 4)
        fs.writeFileSync(jsonfile, data, (err) => {
            if (err) {
                throw err;
            }
            console.log("SAVE: " + data)
        })
        console.log('STOP: save')
    }

    async import(pngfile, tilewidth, tileheight, margin, spacing, tilecount) {
        let Jimp = require('jimp')

        Jimp.read(pngfile)
            .then(img => {
                console.log('START: import')

                this.name = pngfile.split('.').slice(0, -1).join('.')
                this.tilewidth = tilewidth
                this.tileheight = tileheight
                this.spacing = spacing
                this.margin = margin
                this.image = pngfile
                this.imagewidth = img.getWidth()
                this.imageheight = img.getHeight()
                let cols = Math.ceil((this.imagewidth - margin*2)/(tilewidth + spacing))
                let rows = Math.ceil((this.imageheight - margin*2)/(tileheight + spacing))
                
                this.columns = cols
                this.tilecount = tilecount
                
                let count = 0
                for(let row=0; row < rows; row++) {
                    for(let col=0; col < cols; col++) {
                        if (count < tilecount) {
                            let image = img.clone()
                            image.crop(col * (tilewidth+spacing) + margin, row * (tileheight+spacing) + margin, tilewidth, tileheight)
                            this.tiles.push(image)
                            this.hash.push(image.hash())
                        }
                        count ++
                    }
                }

                console.log('STOP: import')

                return true
            })
            .catch(err => {
                throw err
            })

        return false
        // let that = this
        // Jimp.read(pngfile)
        //     .then(img => {
        //         that.name = pngfile.split('.').slice(0, -1).join('.')
        //         that.tilewidth = tilewidth
        //         that.tileheight = tileheight
        //         that.spacing = spacing
        //         that.margin = margin
        //         that.image = pngfile
        //         that.imagewidth = img.getWidth()
        //         that.imageheight = img.getHeight()
        //         let cols = Math.ceil((that.imagewidth - margin*2)/(tilewidth + spacing))
        //         let rows = Math.ceil((that.imageheight - margin*2)/(tileheight + spacing))
                
        //         that.columns = cols
        //         that.tilecount = tilecount
                
        //         let count = 0
        //         for(let row=0; row < rows; row++) {
        //             for(let col=0; col < cols; col++) {
        //                 if (count < tilecount) {
        //                     let image = img.clone()
        //                     image.crop(col * (tilewidth+spacing) + margin, row * (tileheight+spacing) + margin, tilewidth, tileheight)
        //                     that.tiles.push(image)
        //                     that.hash.push(image.hash())
        //                 }
        //                 count ++
        //             }
        //         }
        //     })
        //     .catch(err => {
        //         throw err
        //     })
    }

    export(pngfile, tilewidth, tileheight, spacing, margin) {
        let Jimp = require('jimp')

        // this.firstgid = firstgid
        this.name = pngfile.split('.').slice(0, -1).join('.')
        this.tilewidth = tilewidth
        this.tileheight = tileheight
        this.spacing = spacing
        this.margin = margin
        this.image = pngfile
        this.imagewidth = 128
        this.imageheight = 128
        this.columns = Math.ceil(this.imagewidth / this.tilewidth)
        let image = new Jimp(this.imagewidth, this.imageheight, '#00000000', (err, img) => {
            let row = 0
            let col = 0
            for(let i=0; i<this.tiles.length; i++) {
                img.blit(this.tiles[i], col * (this.tilewidth + this.spacing) + this.margin, row * (this.tileheight + this.spacing) + this.margin)
                col ++
                if (col > this.columns) {
                    col = 0
                    row ++
                }
            }
        })

        image.writeAsync(this.image)
    }
}

const tileset = new JSTiledSet()
tileset.import('./samples/input-tileset.png', 8, 8, 0, 0, 103)
    .then(response => {
        console.log(response)
        if (response == true) {
            tileset.save('./samples/output-tileset.json')
        }
    })
    .catch(err => {
        throw err
    })


// tileset.save('./samples/output-tileset.json').wait()
