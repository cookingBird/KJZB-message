const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pkgName = 'micro-message'
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
  plugins: [
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
}

module.exports = config
