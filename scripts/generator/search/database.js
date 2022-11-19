'use strict';

const { stripHTML } = require('hexo-util');

function savedb(article, config, isPost) {
  const data = {};
  if (article.title) {
    data.title = article.title;
  }
  if (article.path) {
    data.url = encodeURI(config.root + article.path);
  }
  if (config.content !== false) {
    if (config.format === 'raw') {
      data.content = article._content;
    } else {
      data.content = article.content.replace(/<td class="gutter">.*?<\/td>/g, '');
      if (config.format === 'striptags') {
        data.content = stripHTML(data.content);
      }
    }
  } else {
    data.content = '';
  }
  if (!isPost) {
    return data;
  }
  if (article.categories && article.categories.length > 0) {
    data.categories = article.categories.map(category => category.name);
  }
  if (article.tags && article.tags.length > 0) {
    data.tags = article.tags.map(tag => tag.name);
  }
  return data;
}

module.exports = function (locals, config) {
  const searchfield = config.field;
  const database = [];
  if (searchfield === 'all' || searchfield === 'post') {
    locals.posts.each(post => {
      const data = savedb(post, config, true);
      database.push(data);
    });
  }
  if (searchfield === 'all' || searchfield === 'page') {
    locals.pages.each(page => {
      const data = savedb(page, config);
      database.push(data);
    });
  }
  return database;
};
