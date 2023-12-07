import { mergeOps } from "../util";
import WuJiePackage from 'wujie';
import type { GlobalConfig } from '@/index'

const defaultOps = {
	wujieName: 'gislifeMap',
	messageCallback: (...msgs) => {
		return msgs[0]
	},
};

export default function createWuJiePlugin(options) {
	const mergedOps = mergeOps(defaultOps, options);
	const {
		messageCallback,
		wujieName
	} = mergedOps;

	const { bus } = WuJiePackage;
	return {
		install(connector, globalConfig: GlobalConfig) {
			const msgProcess = (...params) => {
				const buildMsg = messageCallback(...params);

				connector.$send({
					target: wujieName,
					...buildMsg
				})
			};

			globalConfig.hooks.findRegistryEl.tap('adapteWujie', (msg) => {
				const registryElCode = msg.sourceCode;
				if(window.customElements?.get("wujie-app")) {
					return document.querySelector(`iframe[data-wujie-flag][name='${registryElCode}']`);
				}
			});

			bus.$on(wujieName, msgProcess);
			connector.on((msg) => {
				bus.$emit(wujieName + '-Receive', {
					type: msg.type,
					response: connector._getResponse(msg)
				})
			});
			return () => {
				bus.$off(wujieName, msgProcess);
				connector.unRegisterApp(wujieName);
			}
		}
	}
}
