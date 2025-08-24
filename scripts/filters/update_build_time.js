hexo.extend.filter.register('before_generate', function () {
  if (hexo.theme.config.build_time === true) {
    const now = new Date();
    const buildTime = now.toISOString();
    hexo.config.build_time = buildTime;
  }
});