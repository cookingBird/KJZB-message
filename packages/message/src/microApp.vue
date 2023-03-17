<template>
	<iframe
		:title="'gislife' + microAppCode"
		:src="src"
		:id="id"
		class="gislife-micro-app"
		ref="window"
	>
	</iframe>
</template>

<script>
import { requestDom } from './index'
import { ConnectChannel } from './ApplicationChannel'

export default {
	name: "microApp",
	// inheritAttrs: false,
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
		}
	},
	data () {
		return {
			id: 'gislife-' + this.microAppCode
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
	created () {
	},
	mounted () {
	},
	updated () { },
	beforeDestroy () {
		this.$connector.unRegisterApp(this.microAppCode)
	},
	methods: {},
}
</script>

<style scoped>
.gislife-micro-app {
	width: 100%;
	height: 100%;
}
</style>
