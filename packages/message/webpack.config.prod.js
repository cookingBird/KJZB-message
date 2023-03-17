const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')
const config = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
}

module.exports = merge(base, config)
