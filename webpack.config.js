const clean = require('clean-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const html = require('html-webpack-plugin');

const isDev = /webpack-dev-server/.test(process.env.npm_lifecycle_script || process.argv.join());

module.exports = {
  context: __dirname + '/src',
  entry: '.',
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [{
      test: /\.styl$/,
      use: extract.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]',
            camelCase: true,
            minimize: true,
            sourceMap: true
          }
        }, 'stylus-loader']
      })
    }, {
      test: /\.(pug|jade)$/,
      use: {
        loader: 'pug-loader',
        options: { pretty: isDev }
      }
    }]
  },
  plugins: [
    new clean(['build']),
    new extract({
      filename: 'style.css',
      disable: isDev,
      // disable: true,
    }),
    new html({ template: 'index.pug' }),
  ]
};
