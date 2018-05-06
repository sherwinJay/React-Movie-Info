const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/react.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, 
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: "file-loader"
      }
    ]
  },
  resolve: {
    alias: {
        jquery: "jquery/src/jquery"
    }
  }
};
