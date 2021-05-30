const Jimp = require('jimp')
var args = process.argv.slice(2)
var name = args[0].split('.').slice(0, -1).join('.')

Jimp.read(name + '.png')
    .then(tilemapImage => {
        let tilemapImageWidth = tilemapImage.getWidth()
        let tilemapImageHeight = tilemapImage.getHeight()
        let tilewidth = parseInt(args[1])
        let tileheight = parseInt(args[2])
        let width = Math.ceil(tilemapImageWidth/tilewidth)
        let height = Math.ceil(tilemapImageHeight/tileheight)

        let datas = []
        let tiles = [null]
        let hashes = ['00000000000']
        
        var count = 0
        for(let row=0; row<height; row++) {
            for(let col=0; col<width; col++) {
                let tile = tilemapImage.clone().crop(col*tilewidth, row*tileheight, tilewidth, tileheight)
                let hash = tile.hash()

                let index = hashes.indexOf(hash)
                if (index == -1) {
                    tiles.push(tile)
                    hashes.push(hash)
                    index = tiles.length - 1
                }
                datas.push(index)
                count++
            }
            console.log("Completed ... "+Math.ceil(count/(width*height)*100)+"% ...")
        }
        
        /* tiledSet update */
        let tilesetImageWidth = 512
        let tilesetImageHeight = 512
        var tiledSet = {
            firstgid: 1,
            name: name.split('/').pop() + '-tileset.png',
            tilewidth: tilewidth,
            tileheight: tileheight,
            margin: 0,
            spacing: 0,
            image: name.split('/').pop() + "-tileset.png",
            imagewidth: tilesetImageWidth,
            imageheight: tilesetImageHeight,
            columns: Math.ceil(tilesetImageWidth / tilewidth),
            tilecount: tiles.length - 1
        }
        
        /* Export TiledSet Image */
        new Jimp(tilesetImageWidth, tilesetImageHeight, (err, img) => {
            if (err) throw err;

            let row = 0
            let col = 0
            let count = 0
            for(let id=1; id<tiles.length; id++) {
                img.blit(tiles[id], col*tilewidth, row*tileheight)
                col++
                if (col>=tiledSet.columns) {
                    col=0
                    row++
                }
                count++
            }

            img.write(name + "-tileset.png")
        })
        
        /* tiledLayer update */
        var tiledLayer = {
            type: 'tilelayer',
            id : 1,
            name: name+'-layer-1',
            data: datas,
            width: width,
            height: height,
            x: 0,
            y: 0,
            visible: true,
            opacity: 1.0
        }

        /* tiledMap update */
        var tiledMap = {
            type: 'map',
            version : '1.6',
            tiledversion: '1.6.0',
            orientation: 'orthogonal',
            renderorder: 'right-down',
            width: width,
            height: height,
            tilewidth: tilewidth,
            tileheight: tileheight,
            infinite: false,
            compressionLevel: -1,
            backgroundcolor: '#000000',
            layers: [tiledLayer],
            tilesets: [tiledSet],
            nextlayerid: 2,
            nextobjectid: 1
        }

        /* Save tiled json file */
        const fs = require('fs')
        const tiledMapString = JSON.stringify(tiledMap, null, 4)
        fs.writeFileSync(name + "-tilemap.json", tiledMapString, (err) => {
            if (err) {
                throw err;
            }
        })

        /* Export TiledMap Image */
        new Jimp(tilemapImageWidth, tilemapImageHeight, (err, img) => {
            if (err) throw err;

            let id = 0
            for(let row=0; row<height; row++) {
                for(let col=0; col<width; col++) {
                    if (datas[id] != 0) {
                        img.blit(tiles[datas[id]], col*tilewidth, row*tileheight)
                    }
                    id++
                }
            }
            img.write(name + '-test.png')
        })
    })
    .catch(err => {
        console.error(err)
        console.log("USAGE: img2tile <imagename> <tilewidth> <tileheight>")
        console.log("USAGE: img2tile <imagename> <tilewidth> <tileheight> <tilesheet> <tilecount>")
    })

