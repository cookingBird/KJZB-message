const { defineConfig } = require('@vue/cli-service')
const path = require("path")
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: path.resolve(__dirname, './src/main.ts'),
    devServer: {
      port: 7003,
      // @ts-expect-error
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        // "Content-Type": "application/json; charset=utf-8",
      },
      client: {
        overlay: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            }
          },
        },
      ],
    },
  }
})
