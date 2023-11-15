//@ts-nocheck
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const base = require('./webpack.config.base')
const pkgName = 'MicroMessage'



module.exports = (env, argv) => {
  const mode = argv.mode || 'production'
  const isProd = mode === 'production';
  const config = {
    mode: mode,
    entry: {
      [pkgName]: path.resolve(__dirname, '../src/index.ts')
    },
    output: {
      filename: '[name].umd.js',
      library: {
        name: '[name]',
        type: 'umd'
      }
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      },
      'wujie': {
        root: 'wujie',
        commonjs: 'wujie',
        commonjs2: 'wujie',
        amd: 'wujie'
      },
      'wujie-react': {
        root: 'WujieReact',
        commonjs: 'wujie-react',
        commonjs2: 'wujie-react',
        amd: 'wujie-react'
      },
      'wujie-vue2': {
        root: 'WujieVue',
        commonjs: 'wujie-vue2',
        commonjs2: 'wujie-vue2',
        amd: 'wujie-vue2'
      },
      'wujie-vue3': {
        root: 'WujieVue',
        commonjs: 'wujie-vue3',
        commonjs2: 'wujie-vue3',
        amd: 'wujie-vue3'
      },
    },
    optimization: {
      minimize: isProd,
      minimizer: [`...`, new CssMinimizerPlugin()],
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
  return merge(base, config)
}
