const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const pkgName = 'micro-message'
if (process.env.NODE_ENV === 'production') {
  rewritePkgFile({
    // main: ['src/index.js', 'dist/micro-message.js']
    main: ['src/index.js', 'dist/micro-message.js']
  })
}
const config = {
  devtool: 'source-map',
  entry: {
    [pkgName]: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      name: '[name]',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      constants: require.resolve('constants-browserify')
    }
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin()
  ]
}

function rewritePkgFile(devOps) {
  const fs = require('fs-extra')
  const pkgJsonFile = JSON.parse(fs.readFileSync('./package.json'))
  for (const key in devOps) {
    const configVal = devOps[key]
    pkgJsonFile[key] = process.env.NODE_ENV === 'development'
      ? configVal[0]
      : configVal[1]
  }
  fs.writeFileSync('./package.json', JSON.stringify(pkgJsonFile))
}
module.exports = config
