const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
  constructor() {
    super('articles')
    }

    async findAll() {
        const articles = await super.findAll();
        return articles
    } 
}

module.exports = ArticleModel;