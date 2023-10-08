//@ts-nocheck
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')

const config = {
	mode: 'development',
	entry: {
		wujie: path.resolve(__dirname, './plugins/wujie.js'),
		wujieReact: path.resolve(__dirname, './plugins/wujieReact.js'),
		wujieVue2: path.resolve(__dirname, './plugins/wujieVue2.js'),
		wujieVue3: path.resolve(__dirname, './plugins/wujieVue3.js'),
		ws: path.resolve(__dirname, './plugins/ws.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist/plugins'),
		filename: '[name].js',
	},
	externals: {
		'wujie': {
			root: 'wujie',
      commonjs: 'wujie',
      commonjs2: 'wujie',
      amd: 'wujie'
		},
		'wujie-react': {
			root: 'WujieReact',
      commonjs: 'wujie-react',
      commonjs2: 'wujie-react',
      amd: 'wujie-react'
		},
		'wujie-vue2': {
			root: 'WujieVue',
      commonjs: 'wujie-vue2',
      commonjs2: 'wujie-vue2',
      amd: 'wujie-vue2'
		},
		'wujie-vue3': {
			root: 'WujieVue',
      commonjs: 'wujie-vue3',
      commonjs2: 'wujie-vue3',
      amd: 'wujie-vue3'
		},
	},
}

module.exports = merge(base, config)
