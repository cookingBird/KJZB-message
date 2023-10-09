//@ts-nocheck
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')

const config = {
	mode: 'development',
	entry: {
		MicroAppVue: path.resolve(__dirname, '../components/MicroAppVue.vue')
	},
	output: {
		path: path.resolve(__dirname, '../dist/components'),
		filename: '[name].js',
	}
}

module.exports = merge(base, config)
