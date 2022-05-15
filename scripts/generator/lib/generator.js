'use strict';

module.exports = function(locals) {
  const config = this.config;
  const database = require('./database')(locals, config);
  return {
    path: config.search.path,
    data: JSON.stringify(database)
  };
};
