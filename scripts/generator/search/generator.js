'use strict';

hexo.extend.generator.register('json', function (locals) {
  if (!hexo.theme.config.search.enable) {
    return {}
  }
  const config = Object.assign({
    root: hexo.config.root,
    path: 'search.json',
    field: 'post',
    content: true,
    format: 'striptags'
  }, hexo.theme.config.search);
  const database = require('./database')(locals, config);
  return {
    path: config.path,
    data: JSON.stringify(database)
  };
});
