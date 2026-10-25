const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = []  
    }

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll();
        res.status(201).json({ articles: articles });
    }

    async getAllArticles(req, res) {
        const articles = await articleModel.findOne(req);
        res.status(201).json({ articles: articles });
    }
}

module.exports = articleController;