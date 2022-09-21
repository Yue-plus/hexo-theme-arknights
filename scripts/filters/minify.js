/* global hexo */

'use strict';

hexo.extend.filter.register('after_generate', () => {
  const theme = hexo.theme.config;

  if (theme.search !== undefined && !theme.search.enable && hexo.config.search !== undefined && !hexo.config.search.enable) {
    hexo.route.remove('js/search.js');
  }

  if (theme.gitalk !== undefined && !theme.gitalk.enable) {
    hexo.route.remove('js/gitalk.js');
  }
});
