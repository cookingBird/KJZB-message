<template>
<iframe
	:data-app-code="microAppCode"
	:src="buildSrc(src)"
	:id="id"
	class="gislife-micro-app"
	ref="window"
	title
>
</iframe>
</template>

<script>
	import { pickFileds, deepCloneBaseType } from './util'

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
				default: () => ({})
			},
		},
		computed: {
			id() {
				return 'gislife-' + this.microAppCode
			},
			passiveState() {
				const res = {
					route: pickFileds(
						this.$route,
						['fullPath', 'hash', 'meta', 'name', 'params', 'path', 'query']
					),
					...deepCloneBaseType(this.state)
				}
				return res
			}
		},
		watch: {
			passiveState(val, oldVal) {
				if (val != oldVal) {
					this.$connector.$send({
						target: this.microAppCode,
						type: 'setState',
						data: this.passiveState
					})
				}
			},
		},
		mounted() {
			const loadCancel = this.$refs.window?.addEventListener('load', () => {
				this.$connector.$send({
					target: this.microAppCode,
					type: 'setState',
					data: val
				})
			});

			this.$connector.$on(this, ({ msg }) => {
				const emitType = msg.type;
				const listener = this.$listeners[emitType];
				if (listener) {
					listener(msg.data)
				}
			});
			this.$on('hook:beforeDestory', loadCancel)
		},
		destroyed() {
			this.$connector.unRegisterApp(this.microAppCode)
		},
		methods: {
			buildSrc(src) {
				const hasParam = src.includes('?');
				return src + (hasParam ? '&' : '?') + 'microAppCode=' + this.microAppCode
			},
		}
	}
</script>

<style lang="css">
	.gislife-micro-app {
		width: 100%;
		height: 100%;
	}
</style>
