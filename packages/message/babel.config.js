module.exports = function(api) {
  api.cache(false)
  const presets = ["@babel/preset-typescript", '@babel/preset-env']
  const plugins = [
    ['transform-remove-console', { exclude: ['error'] }]
  ]
  return {
    presets,
    plugins
  }
}
