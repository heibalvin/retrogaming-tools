const JSTiledSet = require('../jstiledset.js')
var assert = require('assert');

describe('JSTiledSet', function() {
    describe('constructor()', function() {
        it('create class JSTiledSet', function() {
            const tileset = new JSTiledSet()
            const output = {
                firstgid: 0,
                name: '',
                tilewidth: 0,
                tileheight: 0,
                margin: 0,
                spacing: 0,
                image: '',
                imagewidth: 0,
                imageheight: 0,
                columns: 0,
                tilecount: 0
            }
            assert.equal(JSON.stringify(tileset.data), JSON.stringify(output))
        })
    })
    describe('load(json)', function() {
        it('load Tiled compatible json file', function() {
            const tileset = new JSTiledSet()
            tileset.load('samples/test-tileset-input.json')
            const output = {
                firstgid: 1,
                name: 'test-tileset-input.png',
                tilewidth: 8,
                tileheight: 8,
                margin: 0,
                spacing: 0,
                image: 'test-tileset-input.png',
                imagewidth: 72,
                imageheight: 72,
                columns: 16,
                tilecount: 44
            }
            assert.equal(JSON.stringify(tileset.data), JSON.stringify(output))
        })
    })
    describe('save(json)', function() {
        it('save Tiled compatible json file', function() {
            const tileset = new JSTiledSet()
            tileset.load('samples/test-tileset-input.json')
            tileset.data.name = 'test-tileset-output.png'
            tileset.data.image = 'test-tileset-output.png'
            tileset.data.imagewidth = 64
            tileset.data.imageheight = 64
            tileset.save('samples/test-tileset-output.json')
            const output = {
                firstgid: 1,
                name: 'test-tileset-output.png',
                tilewidth: 8,
                tileheight: 8,
                margin: 0,
                spacing: 0,
                image: 'test-tileset-output.png',
                imagewidth: 64,
                imageheight: 64,
                columns: 16,
                tilecount: 44
            }
            assert.equal(JSON.stringify(tileset.data), JSON.stringify(output))
        })
    })
    describe('import(png, tilewidth, tileheight, margin, spacing, tilecount, firstgid)', function() {
        it('import Tiled compatible png file', function() {
            const output = {
                firstgid: 1,
                name: 'samples/test-tileset-input.png',
                tilewidth: 8,
                tileheight: 8,
                margin: 0,
                spacing: 0,
                image: 'samples/test-tileset-input.png',
                imagewidth: 70,
                imageheight: 70,
                columns: 8,
                tilecount: 44
            }
            const tileset = new JSTiledSet()
            tileset.import('samples/test-tileset-input.png', 8, 8, 0, 0, 44, 1)
                .then(() => {
                    assert.equal(JSON.stringify(tileset.data), JSON.stringify(output))
                })
        })
    })
})