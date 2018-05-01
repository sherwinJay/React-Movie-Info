const webpack = require('webpack');

module.exports = {
  entry:{
    entry: __dirname + '/entry.js'
  },
  output: {
    filename: '[name].bundle.js'
  }
}
