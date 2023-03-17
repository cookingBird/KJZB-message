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
import { requestDom } from './util'

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
	data () {
		return {
			id: 'gislife-' + this.microAppCode,
		};
	},
	watch: {
		state: {
			deep: true,
			immediate: true,
			async handler (val) {
				await requestDom(this.id,(el) => el && el.contentWindow)
				/**@type ConnectChannel */
				const connector = this.$connector;
				connector.sendState(this.microAppCode,val)
			}
		}
	},

	beforeDestroy () {
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
