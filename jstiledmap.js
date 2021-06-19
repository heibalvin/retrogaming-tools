'use strict'

class JSTiledMap {
    constructor() {
        this.data = {
            type: 'map',
            version : '1.6',
            tiledversion: '1.6.0',
            orientation: 'orthogonal',
            renderorder: 'right-down',
            width: 0,
            height: 0,
            tilewidth: 0,
            tileheight: 0,
            infinite: false,
            compressionLevel: -1,
            backgroundcolor: '#000000',
            layers: [],
            tilesets: [],
            nextlayerid: 1,
            nextobjectid: 1
        }
    }

    load(json) {
        const fs = require('fs')
        fs.readFile(json, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }

            this.data = JSON.parse(jsonString)
        })

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
}

const tilemap = new JSTiledMap()
tilemap.save('./samples/test-tilemap.json')
tilemap.load('./samples/test-tilemap-2.json')
