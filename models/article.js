const BaseSQLModel = require('./base');

class ArticleModel extends BaseSQLModel {
  constructor() {
    super('articles');
  }

  async findAll() {
    return super.findAll();
  }

  async findBySlug(slug) {
    return super.findOne('slug', slug);
  }

  async createArticle(data) {
    return super.create(data);
  }

  async updateArticle(id, data) {
    return super.update(id, data);
  }

  async deleteArticle(id) {
    return super.delete(id);
  }
}

module.exports = ArticleModel;