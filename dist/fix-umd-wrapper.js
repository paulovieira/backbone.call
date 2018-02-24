let Fs = require('fs');
let Path = require('path');

let inputFile = Path.join(__dirname, 'backbone.call.js');
let outputFile = Path.join(__dirname, 'backbone.call.js');

let src = Fs.readFileSync(inputFile, 'utf8');
let before = 'root["CallRouter"] = factory(root["_"], root["Backbone"], root["Marionette"]);'
let after  = 'factory(root["_"], root["Backbone"], root["Marionette"]);'

src = src.replace(before, after);

Fs.writeFileSync(outputFile, src, 'utf8');

console.log('Webpack UMD wrapper has been fixed')
