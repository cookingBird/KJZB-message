//@ts-nocheck
const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')
const pkgName = 'micro-message'
const config = {
  mode: 'development',
  entry: {
    [pkgName]: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /.*/,
          name: pkgName,
          chunks: 'all'
        }
      }
    },
    removeEmptyChunks: true
  }
}

module.exports = merge(base, config)
