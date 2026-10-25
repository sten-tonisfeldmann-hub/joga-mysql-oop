const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
  constructor() {
    super('articles')
    }

    async findAll() {
        const articles = await super.findAll();
        return articles
    } 

    async findOne(slug) {
        const article = await super.findOne('slug', slug);
        return article;
    }
}

module.exports = ArticleModel;