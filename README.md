# RETROGAMING TOOLS

## IMG2TILED

Rips a game screenshot into tiles. Not appending tiles, or appending multiple layers.   
Takes in input screenshot png file, output will be a tilemap json file with a tileset png file.

Usage: `node img2tiled.js filename tilewidth tileheight`
Example: 
 * `node img2tiled.js samples/sorcery-village-1.png 8 8`
 * `node img2tiled.js samples/pacman-maze.png 8 8`
 * `node img2tiled.js samples/robocop-stage-1.png 8 8`

## Unit Testing

Usage: `npm test`

Unit Test code under `./test/test.js`
