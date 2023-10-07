//@ts-nocheck
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')

const config = {
	mode: 'production',
	entry: {
		wujie: path.resolve(__dirname, './plugins/wujie.js'),
		ws: path.resolve(__dirname, './plugins/ws.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist/plugin'),
		filename: '[name].js',
	}
}

module.exports = merge(base, config)
