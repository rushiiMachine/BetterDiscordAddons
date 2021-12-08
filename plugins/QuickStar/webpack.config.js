const { info } = require('./config.json');
const { Config } = require('webpack-config');

module.exports = new Config().extend(__dirname + '/../../webpack.base.config.js').merge({
  entry: __dirname + '/plugin.tsx',
  output: {
    path: __dirname + '/../../dist',
    filename: `${info.name}.plugin.js`
  },
  externals: {
    react: 'ZeresPluginLibrary.DiscordModules.React'
  }
});
