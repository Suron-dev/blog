import article from "../Model/Article.js";
import articleSchema from "../validations/articleValidation.js";

class ArticleController {

    static async getAllArticles(req, res) {
        try {
            const result = await article.getArticles();
            if (result.error) return res.status(404).json({error: result.error});
            res.status(200).json({
                message: result.message,
                articles: result.articles
            });
        } catch (err) {
            res.status(500).json({error: "Internal Server Error"});
        }
    }


    static async createArticle(req, res) {
        // const { title , category , excerpt , content , author , readTime , tags } = req.body;
        const {error, value} = articleSchema.validate(req.body, {abortEarly: false});
        if (error) {
            const errors = error.details.map((e) => e.message);
            return res.status(400).json({error: errors});
        }
        if (!value.excerpt || value.excerpt.trim() === "") {
            value.excerpt = value.content.slice(0, 150);
        }
        try {
            const { title , category_id , excerpt , content , user_id , readTime , tags } = value;
            const result = await article.createArticle(title, category_id, excerpt, content , user_id , readTime, tags);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({error: "Internal Server Error"});
        }
    }


}


export default ArticleController;