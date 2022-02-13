/**
 * @name QuickStar
 * @description Add a star reaction option to message options.
 * @version 1.0.1
 * @author Diamond
 * @website https://github.com/DiamondMiner88/BetterDiscordAddons/blob/master/plugins/QuickStar
 * @source https://github.com/DiamondMiner88/BetterDiscordAddons/blob/master/dist/QuickStar.plugin.js
 * @updateUrl https://raw.githubusercontent.com/DiamondMiner88/BetterDiscordAddons/master/dist/QuickStar.plugin.js
 * @invite kkcqFZrT52
*/

/*@cc_on
@if (@_jscript)
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	shell.Popup("Moving plugin to BetterDiscord's plugin folder...", 0, "QuickStar", 0x40);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("Plugin already installed!", 0, "QuickStar", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("Failed to find BetterDiscord!\nIs it even installed?", 0, "QuickStar", 0x10);
	}
	fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
	shell.Popup("Successfully installed!", 0, "QuickStar", 0x40);
	WScript.Quit();
@else@*/
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 846:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


;// CONCATENATED MODULE: ./common/CustomModules.ts
/* harmony default export */ function CustomModules({ WebpackModules }) {
    return {
        get LastSelectedChannelStore() {
            return WebpackModules.getByProps('getLastSelectedChannelId');
        },
        // verify name
        get AstParser() {
            return WebpackModules.getByProps('parse', 'parseTopic');
        },
        get ReactionUtils() {
            return WebpackModules.getByProps('addReaction', 'removeReaction');
        },
        get PermissionUtils() {
            return WebpackModules.getByProps('getChannelPermissions', 'can');
        },
        get Permissions() {
            return WebpackModules.getByProps('Permissions', 'BLOG_DOMAIN', 'APP_URL_PREFIX').Permissions;
        }
    };
}

;// CONCATENATED MODULE: external "window.require(\"request\")"
const external_window_require_request_namespaceObject = window.require("request");
;// CONCATENATED MODULE: external "window.require(\"fs\")"
const external_window_require_fs_namespaceObject = window.require("fs");
;// CONCATENATED MODULE: external "window.require(\"path\")"
const external_window_require_path_namespaceObject = window.require("path");
;// CONCATENATED MODULE: external "window.require(\"electron\")"
const external_window_require_electron_namespaceObject = window.require("electron");
;// CONCATENATED MODULE: ./common/BuildPlugin.ts
/* Module imports */




function buildPlugin(config_, buildPlugin) {
    const config = config_;
    return !__webpack_require__.g.ZeresPluginLibrary
        ? class {
            constructor() {
                this.getName = () => config.info.name;
                this.getAuthor = () => config.info.authors.map(a => a.name).join(', ');
                this.getDescription = () => config.info.description + ' **Install [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9) and restart discord to use this plugin!**';
                this.getVersion = () => config.info.version;
            }
            load() {
                BdApi.showConfirmationModal('Library Missing', `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                    confirmText: 'Download Now',
                    cancelText: 'Cancel',
                    onConfirm: () => {
                        external_window_require_request_namespaceObject.get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', async (error, _, body) => {
                            if (error)
                                return external_window_require_electron_namespaceObject.shell.openExternal('https://betterdiscord.app/Download?id=9');
                            await new Promise(r => external_window_require_fs_namespaceObject.writeFile(external_window_require_path_namespaceObject.join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body, r));
                        });
                    }
                });
            }
            start() { }
            stop() { }
        }
        : (([BasePlugin, Library]) => buildPlugin(BasePlugin, Library))(__webpack_require__.g.ZeresPluginLibrary.buildPlugin(config));
}

;// CONCATENATED MODULE: ./plugins/QuickStar/config.json
const config_namespaceObject = JSON.parse('{"info":{"name":"QuickStar","description":"Add a star reaction option to message options.","version":"1.0.1","mainAuthor":{"name":"Diamond"},"authors":[{"name":"Diamond","github_username":"DiamondMiner88"}],"invite":"kkcqFZrT52","website":"https://github.com/DiamondMiner88/BetterDiscordAddons/blob/master/plugins/QuickStar","source":"https://github.com/DiamondMiner88/BetterDiscordAddons/blob/master/dist/QuickStar.plugin.js","updateUrl":"https://raw.githubusercontent.com/DiamondMiner88/BetterDiscordAddons/master/dist/QuickStar.plugin.js"}}');
;// CONCATENATED MODULE: ./plugins/QuickStar/plugin.tsx
// TODO: export properly without globals
/* Imports */



const QuickStar = buildPlugin(config_namespaceObject, (Plugin, Library) => {
    /* Libraries */
    const { Patcher, DiscordModules, WebpackModules } = Library;
    /* Discord webpack modules */
    const { React } = DiscordModules;
    const { ReactionUtils, PermissionUtils, Permissions } = CustomModules(Library);
    const Menu = WebpackModules.getByProps('MenuItem');
    /* Plugin class */
    return class QuickStar extends Plugin {
        constructor() {
            super();
            this.patches = [];
        }
        /* Mandatory methods */
        async onStart() {
            const MessageContextMenu = await Library.DCM.getDiscordMenu('MessageContextMenu');
            this.patches.push(Patcher.after(MessageContextMenu, 'default', (_, args, returnVal) => {
                const { channel, message } = args[0];
                const { id: message_id, channel_id } = message;
                if (!PermissionUtils.can(Permissions.ADD_REACTIONS, channel))
                    return;
                const tree = returnVal.props.children[2].props.children;
                tree.splice(7, 0, React.createElement(Menu.MenuItem, { id: "quick-star", label: "Quick Star", action: () => {
                        ReactionUtils.addReaction(channel_id, message_id, { id: null, name: '⭐', animated: false });
                    } }));
            }));
        }
        onStop() {
            Patcher.unpatchAll(this.patches);
        }
    };
});
Object.assign(__webpack_require__.g, { QuickStar });


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[846](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
/*@end@*/