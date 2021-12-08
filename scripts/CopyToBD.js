/**
 * Script for copying a plugin to the BD plugins folder.
 * Accepts one argument, the plugin name.
 */

const fs = require('fs');
const path = require('path');

const bdFolder =
  (process.platform == 'win32'
    ? process.env.APPDATA
    : process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.XDG_CONFIG_HOME
    ? process.env.XDG_CONFIG_HOME
    : process.env.HOME + '/.config') + '/BetterDiscord/';
const pluginFile = `${process.argv[2]}.plugin.js`;

fs.copyFileSync(
  path.join(__dirname, '../dist/', pluginFile),
  path.join(bdFolder, '/plugins/', pluginFile)
);
