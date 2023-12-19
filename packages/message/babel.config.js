const presets = ["@babel/preset-typescript", '@babel/preset-env']
const plugins = [
  ['transform-remove-console', { exclude: ['error'] }]
]
module.exports = {
  presets,
  plugins
}
