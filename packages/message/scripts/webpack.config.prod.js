//@ts-nocheck
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')
const pkgName = 'micro-message'

const config = {
  mode: 'production',
  entry: {
    [pkgName]: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].min.js',
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
    concatenateModules: true,
    minimize: true,
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
