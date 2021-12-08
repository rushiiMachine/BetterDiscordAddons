/* Module imports */
import * as request from 'request';
import * as fs from 'fs';
import * as path from 'path';
import * as electron from 'electron';

/* Typings imports */
import { ZeresPluginLibrary, PluginConfig, BasePlugin } from './types';

export default function (config_: unknown, buildPlugin: (basePlugin: BasePlugin, library: ZeresPluginLibrary) => BasePlugin): unknown {
  const config = config_ as PluginConfig;
  return !global.ZeresPluginLibrary
    ? class {
        getName = () => config.info.name;
        getAuthor = () => config.info.authors.map(a => a.name).join(', ');
        getDescription = () => config.info.description + ' **Install [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9) and restart discord to use this plugin!**';
        getVersion = () => config.info.version;
        load() {
          BdApi.showConfirmationModal('Library Missing', `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
            confirmText: 'Download Now',
            cancelText: 'Cancel',
            onConfirm: () => {
              request.get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', async (error, _, body) => {
                if (error) return electron.shell.openExternal('https://betterdiscord.app/Download?id=9');
                await new Promise(r => fs.writeFile(path.join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body, r));
              });
            }
          });
        }
        start() {}
        stop() {}
      }
    : (([BasePlugin, Library]) => buildPlugin(BasePlugin, Library))(global.ZeresPluginLibrary.buildPlugin(config));
}
