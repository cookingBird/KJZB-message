const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  lintOnSave: true,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: 7070,
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
