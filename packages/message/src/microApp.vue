<template>
<iframe
	:title="id"
	:src="buildSrc(src)"
	:id="id"
	class="gislife-micro-app"
	:class="classNmae"
	ref="window"
>
</iframe>
</template>

<script>
	import * as Validator from './util/validator'
	import { omitKeys } from './util'

	export default {
		name: "microApp",
		inheritAttrs: false,
		props: {
			src: {
				type: String,
				required: true
			},
			microAppCode: {
				type: String,
				required: true,
			},
			state: {
				type: Object,
			},
			classNmae: String
		},
		computed: {
			id () {
				return 'gislife-' + this.microAppCode
			},
			passiveState () {
				return {
					route: omitKeys(this.$route,
						(n,key) => Validator.isFunction(n) || key === 'matched'
					),
					...Object.assign({},this.state)
				}
			}
		},
		watch: {
			passiveState: {
				immediate: true,
				handler (val,oldVal) {
					if (val != oldVal) {
						this.$connector.$send({
							target: this.microAppCode,
							type: 'setState',
							data: val
						})
					}
				}
			},
		},
		destroyed () {
			this.$connector.unRegisterApp(this.microAppCode)
		},
		methods: {
			buildSrc (src) {
				const hasParam = src.includes('?');
				return src + (hasParam ? '&' : '?') + 'microAppCode=' + this.microAppCode
			}
		}
	}
</script>

<style lang="css">
	.gislife-micro-app {
		width: 100%;
		height: 100%;
	}
</style>
