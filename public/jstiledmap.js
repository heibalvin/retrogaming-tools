class JSTiledMap {
    constructor() {
        this.type = 'map'
        this.version = '1.6'
        this.tiledversion = '1.6.0'
        this.orientation = 'orthogonal'
        this.renderorder = 'right-down'
        this.width = 0
        this.height = 0
        this.tilewidth = 0
        this.tileheight = 0
        this.infinite = false
        this.compressionLevel = -1
        this.backgroundcolor = '#00000000'
        this.layers = []
        this.tilesets = []
        this.nextlayerid = 1
        this.nextobjectid = 1
        this.properties = []
    }

    load(fileName) {
        const fs = require('fs')

        try {
            const data = fs.readFileSync(fileName, 'utf8');
            const json = JSON.parse(data)
    
            this.type = json.type
            this.version = json.version
            this.tiledversion = json.tiledversion
            this.orientation = json.orientation
            this.renderorder = json.renderorder
            this.width = json.width
            this.height = json.height
            this.tilewidth = json.tilewidth
            this.tileheight = json.tileheight
            this.infinite = json.infinite
            this.compressionLevel = json.compressionLevel
            this.backgroundcolor = json.backgroundcolor
            this.layers = json.layers
            this.nextlayerid = json.nextlayerid
            this.nextobjectid = json.nextobjectid
            this.tilesets = json.tilesets
            this.properties = json.properties
        } catch (err) {
            console.log(`ERROR: cannot read file from disk: ${fileName}`);
        }
    }

    save(filename) {
        const fs = require('fs')

        const json = {
            type: this.type,
            version : this.version,
            tiledversion: this.tiledversion,
            orientation: this.orientation,
            renderorder: this.renderorder,
            width: this.width,
            height: this.height,
            tilewidth: this.tilewidth,
            tileheight: this.tileheight,
            infinite: this.infinite,
            compressionLevel: this.compressionLevel,
            backgroundcolor: this.backgroundcolor,
            layers: this.layers,
            nextlayerid: this.nextlayerid,
            nextobjectid: this.nextobjectid,
            tilesets: this.tilesets,
            properties: this.properties
        }

        const data = JSON.stringify(json, null, 4)
        fs.writeFileSync(filename, data, (err) => {
            if (err) {
                throw err;
            }
            console.log("SAVE: " + data)
        })      
    }
}

// const map = new JSTiledMap()
// console.log(map)

// map.load('input.json')
// console.log(map)

// map.version = '1.7'
// map.save('output.json')
// console.log(map)