
class JSTiledLayer {
    constructor() {
        this.type = 'tilelayer'
        this.id = 0
        this.name = ''
        this.data = []
        this.width = 0
        this.height = 0
        this.x = 0
        this.y = 0
        this.visible = true
        this.opacity = 1.0
    }

    load(fileName) {
        const fs = require('fs')

        try {
            const data = fs.readFileSync(fileName, 'utf8');
            const json = JSON.parse(data)

            this.type = json.type
            this.id = json.id
            this.name = json.name
            this.data = json.data
            this.width = json.width
            this.height = json.height
            this.x = json.x
            this.y = json.y
            this.visible = json.visible
            this.opacity = json.opacity
        } catch (err) {
            console.log(`ERROR: cannot read file from disk: ${fileName}`);
        }
    }

    save(filename) {
        const fs = require('fs')

        const json = {
            type: this.type,
            id : this.id,
            name: this.name,
            data: this.data,
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y,
            visible: this.visible,
            opacity: this.opacity
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

// const layer = new JSTiledLayer()
// console.log(layer)

// layer.load('layer-input.json')
// console.log(layer)

// layer.save('layer-output.json')
// console.log(layer)