/**
 * @name QuickStar
 * @description Add a star reaction option to message options.
 * @version 1.0.0
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
(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),((e,t,i)=>{const n=window.require("request"),r=window.require("fs"),o=window.require("path"),s=window.require("electron"),a=function(e,t){const a=e;return i.g.ZeresPluginLibrary?(([e,i])=>t(e,i))(i.g.ZeresPluginLibrary.buildPlugin(a)):class{constructor(){this.getName=()=>a.info.name,this.getAuthor=()=>a.info.authors.map((e=>e.name)).join(", "),this.getDescription=()=>a.info.description+" **Install [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9) and restart discord to use this plugin!**",this.getVersion=()=>a.info.version}load(){BdApi.showConfirmationModal("Library Missing",`The library plugin needed for ${a.info.name} is missing. Please click Download Now to install it.`,{confirmText:"Download Now",cancelText:"Cancel",onConfirm:()=>{n.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",(async(e,t,i)=>{if(e)return s.shell.openExternal("https://betterdiscord.app/Download?id=9");await new Promise((e=>r.writeFile(o.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),i,e)))}))}})}start(){}stop(){}}}(JSON.parse('{"info":{"name":"QuickStar","description":"Add a star reaction option to message options.","version":"1.0.0","mainAuthor":{"name":"Diamond"},"authors":[{"name":"Diamond","github_username":"DiamondMiner88"}],"invite":"kkcqFZrT52","website":"https://github.com/DiamondMiner88/BetterDiscordAddons/blob/master/plugins/QuickStar","source":"https://github.com/DiamondMiner88/BetterDiscordAddons/blob/master/dist/QuickStar.plugin.js","updateUrl":"https://raw.githubusercontent.com/DiamondMiner88/BetterDiscordAddons/master/dist/QuickStar.plugin.js"}}'),((e,t)=>{const{Patcher:i,DiscordModules:n,WebpackModules:r}=t,{MessageContextMenu:o,ReactionUtils:s}=function({WebpackModules:e}){return{get LastChannelStore(){return e.getByProps("getLastSelectedChannelId")},get AstParser(){return e.getByProps("parse","parseTopic")},get MessageContextMenu(){return e.find((e=>"MessageContextMenu"===e?.default?.displayName))},get ReactionUtils(){return e.getByProps("addReaction","removeReaction")}}}(t),{React:a}=n,u=r.getByProps("MenuItem");return class extends e{constructor(){super(),this.patches=[]}onStart(){this.patches.push(i.after(o,"default",((e,t,i)=>{console.log(t);const{id:n,channel_id:r}=t[0].message;i.props.children[2].props.children.splice(1,0,a.createElement(u.MenuItem,{id:"gloabl-reply",label:"Quick Star",action:()=>{s.addReaction(r,n,{id:null,name:"⭐",animated:!1})}}))})))}onStop(){i.unpatchAll(this.patches)}}}));Object.assign(i.g,{QuickStar:a})})(0,0,e)})();
/*@end@*/