//@ts-nocheck
const path = require('path')
const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const base = require('./webpack.config.base')
const pkgName = 'MicroMessage'



// module.exports = (env, argv) => {
//   const mode = argv.mode || 'production'
//   const isProd = mode === 'production'

//   const config = {
//     mode: mode,
//     experiments: {
//       outputModule: true
//     },
//     entry: {
//       [pkgName]: path.resolve(__dirname, '../src/index.ts')
//     },
//     output: {
//       filename: '[name].es.js',
//       libraryTarget: 'module',
//       library: {
//         type: 'module',
//       }
//     },
//     externals: {
//       "wujie-vue3": 'wujie-vue3',
//       "vue": "vue"
//     },
//     optimization: {
//       minimizer: [`...`, new CssMinimizerPlugin()],
//       minimize: isProd,
//       concatenateModules: true,
//       splitChunks: {
//         cacheGroups: {
//           vendors: {
//             test: /.*/,
//             name: pkgName,
//             chunks: 'all'
//           }
//         }
//       },
//       removeEmptyChunks: true
//     }
//   }

//   return merge(base, config)
// }

const config = {
  mode: 'development',
  experiments: {
    outputModule: true
  },
  entry: {
    [pkgName]: path.resolve(__dirname, '../src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].es.js',
    library: {
      type: 'module',
    }
  },
  externals: {
    "wujie-vue3": 'wujie-vue3',
    "vue": "vue"
  }
}

module.exports = merge(base, config);
