const ArticleModel = require('../models/article');
const articleModel = new ArticleModel();

class ArticleController {
  async getAllArticles(req, res) {
    try {
      const articles = await articleModel.findAll();
      res.status(200).json({ articles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArticleBySlug(req, res) {
    try {
      const { slug } = req.params;
      const article = await articleModel.findBySlug(slug);
      res.status(200).json({ article });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ArticleController;