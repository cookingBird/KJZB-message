//@ts-nocheck
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base')

const config = {
	mode: 'development',
	entry: {
		wujie: path.resolve(__dirname, '../plugins/wujie.ts'),
		wujieReact: path.resolve(__dirname, '../plugins/wujieReact.ts'),
		wujieVue2: path.resolve(__dirname, '../plugins/wujieVue2.ts'),
		wujieVue3: path.resolve(__dirname, '../plugins/wujieVue3.ts'),
		ws: path.resolve(__dirname, '../plugins/ws.ts')
	},
	output: {
		path: path.resolve(__dirname, '../dist/plugins'),
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
