const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  lintOnSave: true,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: 7070,
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
            },
          },
        },
      ],
    },
  },
});
