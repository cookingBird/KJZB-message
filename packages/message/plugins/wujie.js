import { mergeOps } from "../src/util"

const defaultOps = {
	wujieName: 'gislifeMap',
	package: 'wujie',//
	messageType: 'gislifeMap',
	messageCallback: (...msgs) => {
		return msgs[0]
	},
};

export default function createWuJiePlugin(options) {
	//@ts-expect-error
	if (!window.__POWERED_BY_WUJIE__) {
		throw Error("__POWERED_BY_WUJIE__ is undefined");
	}
	const mergedOps = mergeOps(defaultOps, options);
	const {
		package: packageName,
		messageType,
		messageCallback,
		wujieName
	} = mergedOps;
	const { bus } = require(packageName);
	return {
		install(connector) {

			const msgProcess = (...params) => {
				const buildMsg = messageCallback(...params);

				connector.$send({
					target: wujieName,
					...buildMsg
				})
			};

			bus.$on(messageType, msgProcess);
			return () => {
				bus.$off(messageType, msgProcess);
				connector.unRegisterApp(wujieName);
			}
		}
	}
}
