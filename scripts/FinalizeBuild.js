/**
 * This is run after webpack has generated the code in dist/
 * Accepts one argument, the plugin name.
 *
 * - Generates and prefixes header
 * - Add license information
 */

/* Imports */
const path = require('path');
const fs = require('fs');

/* Paths */
const pluginName = process.argv[2];
const pluginFile = path.join(__dirname, `../dist/${pluginName}.plugin.js`);
const configFile = path.join(__dirname, `../plugins/${pluginName}/config.json`);

/* Generate header */
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

let buffer = `/**\n * @name ${config.info.name}`;

if (config.info.description)
  buffer += `\n * @description ${config.info.description.replace(/\n/g, '\n * ')}`;

if (config.info.version) buffer += `\n * @version ${config.info.version}`;

if (config.info.mainAuthor) {
  const author = config.info.mainAuthor;
  buffer += `\n * @author ${author.name}`;

  if (author.link) buffer += `\n * @authorLink ${author.link}`;

  const author2 = config.info.authors[author];
  if (author2?.discord_id) buffer += `\n * @authorId ${author2.discord_id}`;
}

if (config.info.website) buffer += `\n * @website ${config.info.website}`;

if (config.info.source) buffer += `\n * @source ${config.info.source}`;

if (config.info.updateUrl) buffer += `\n * @updateUrl ${config.info.updateUrl}`

if (config.info.invite) buffer += `\n * @invite ${config.info.invite}`;

if (config.info.donate) buffer += `\n * @donate ${config.info.donate}`;

if (config.info.patreon) buffer += `\n * @patreon ${config.info.patreon}`;

buffer += '\n*/\n';

/* Add licenses */
config.build.licenses?.map(license => (buffer += `/** ${license} **/\n`));

if (config.build.includeInstallScript) buffer += `
/*@cc_on
@if (@_jscript)
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\\\BetterDiscord\\\\plugins");
	var pathSelf = WScript.ScriptFullName;
	shell.Popup("Moving plugin to BetterDiscord's plugin folder...", 0, "${config.info.name}", 0x40);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("Plugin already installed!", 0, "${config.info.name}", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("Failed to find BetterDiscord!\\nIs it even installed?", 0, "${config.info.name}", 0x10);
	}
	fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
	shell.Popup("Successfully installed!", 0, "${config.info.name}", 0x40);
	WScript.Quit();
@else@*/
`

/* Add code */
buffer += fs
  .readFileSync(pluginFile, 'utf8')
  .replace(`/*! For license information please see ${pluginName}.plugin.js.LICENSE.txt */\n`, '');

if (config.build.includeInstallScript) buffer += `\n/*@end@*/`

fs.writeFileSync(pluginFile, buffer, { encoding: 'utf8', flag: 'w' });
