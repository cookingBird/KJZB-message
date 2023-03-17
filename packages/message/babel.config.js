module.exports = {
  presets: ['@babel/preset-env'],
  plugins:
    process.env.NODE_ENV === 'production'
      ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
      : []
}
