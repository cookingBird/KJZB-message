module.exports = function (api) {
  api.cache(false)
  const presets = ['@babel/preset-env']
  const plugins = []
  if (process.env.NODE_ENV === 'production') {
    plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
  }
  return {
    presets,
    plugins
  }
}
