import article from "../Model/Article.js";
import { createArticleSchema, updateArticleSchema } from "../validations/articleValidation.js";
import Article from "../Model/Article.js";

class ArticleController {
    static async getAllArticles(req, res) {
        try {
            const result = await article.getArticles();
            if (result.error) return res.status(404).json({ error: result.error });
            res.status(200).json({
                message: result.message,
                articles: result.articles,
            });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async showArticle(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await Article.getArticleById(id);
            const article = result.article;
            const dateObj = new Date(article.created_at);
            article.formattedDate = dateObj.toLocaleDateString("EN", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            res.render("articles/show", { article: result.article, message: result.message });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async createArticlePage(req, res) {
        res.render("articles/create");
    }

    static async createArticle(req, res) {
        const { error, value } = createArticleSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((e) => e.message);
            return res
                .status(400)
                .json({ error: "input validations for create article are failed " + errors });
        }
        if (!value.excerpt || value.excerpt.trim() === "") {
            value.excerpt = value.content.slice(0, 150);
        }
        try {
            const { title, category_id, excerpt, content, user_id, readTime, tags } = value;
            const result = await article.createArticle(
                title,
                category_id,
                excerpt,
                content,
                user_id,
                readTime,
                tags
            );
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error (create article failed)" });
        }
    }

    static async editArticle(req, res) {
        const id = parseInt(req.params.id);
        const result = await Article.getArticleById(id);
        if (result.error) return res.status(404).json({ error: result.error });
        console.log(result.article);
        console.log("article fetched . moving to edit article page");
        return res.render("articles/edit", { article: result.article });
    }

    static async updateArticle(req, res) {
        delete req.body._method;
        const { error, value } = updateArticleSchema.validate(req.body, {
            abortEarly: false,
            allowUnknown: true,
        });
        if (error) {
            const errors = error.details.map((e) => e.message);
            return res.status(400).json({ error: "input validations for update are failed:" + errors });
        }
        try {
            const { title, category_id, excerpt, content, user_id, readTime, tags } = value;
            const id = parseInt(req.params.id);
            console.log(id);
            const result = await article.updateArticle(
                title,
                category_id,
                excerpt,
                content,
                user_id,
                readTime,
                tags,
                id
            );
            if (result.error) return res.status(500).json({ error: result.error });
            res.status(200).json({
                message: result.message,
                article: result.article,
            });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error (update article failed)" });
        }
    }
}

export default ArticleController;
