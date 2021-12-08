/**
 * Webpack loader for plugin config.
 * Validates the config against the schema, and remove the properties $schema, build, licenses
 *
 * Example usage:
 * {
 *   test: /\.json$/,
 *   loader: __dirname + '/../../common/config-loader.js',
 *   exclude: /node_modules/
 * }
 */

const { validate } = require('schema-utils');

module.exports = function (source) {
  const schemaPath = __dirname + '/config.schema.json';
  this.addDependency(schemaPath);

  if (this.cacheable) this.cacheable();

  source = typeof source === 'string' ? JSON.parse(source) : source;

  validate(require(schemaPath), source, { name: 'Plugin config loader' });

  delete source.$schema;
  delete source.build;
  delete source.licenses;

  return JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
};
