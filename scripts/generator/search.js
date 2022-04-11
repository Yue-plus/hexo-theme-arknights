/* global hexo */

'use strict';

const path = require('path');

hexo.config.search = Object.assign({
  path   : 'search.json',
  field  : 'post',
  content: true,
  format : 'html'
}, hexo.config.theme_config.search === undefined ?
  hexo.config.search : hexo.config.theme_config.search);
const config = hexo.config.search;

// Add extension name if doesn't exist
if (!path.extname(config.path)) {
  config.path += '.json';
}
hexo.extend.generator.register('json', require('./lib/json_generator'));
