/* global hexo */

'use strict';

hexo.extend.filter.register('after_generate', () => {
  const theme = hexo.theme.config;

  if (!theme.search.enable && !hexo.config.search.enable) {
    hexo.route.remove('js/search.js');
  }

  if (!theme.gitalk.enable) {
    hexo.route.remove('js/gitalk.js');
  }
});
