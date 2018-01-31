var Fs = require('fs');
var Path = require('path');

var webpackOutput = Path.join(__dirname, 'backbone.call.js');
var src = Fs.readFileSync(webpackOutput, 'utf8'), before = '', after = '';

before = 'root["CallRouter"] = factory(root["_"], root["Backbone"], root["Marionette"]);'

after = 'factory(root["_"], root["Backbone"], root["Marionette"]);'

src = src.replace(before, after);

Fs.writeFileSync(webpackOutput, src, 'utf8');
console.log('Webpack UMD wrapper has been fixed')
