const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'aframe-startplay-component.js',
    path: path.resolve(__dirname, 'dist')
  }
};
