import { SyncBailHook } from 'tapable';
import { type DataMsg } from '../ApplicationChannel';

export default {
  hooks: Object.freeze({
    findRegistryEl: new SyncBailHook<DataMsg, HTMLIFrameElement>(['registerMsg'])
  })
}
