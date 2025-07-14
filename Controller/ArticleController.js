import Article from "../Model/Article.js";
import { createArticleSchema, updateArticleSchema } from "../validations/articleValidation.js";

class ArticleController {

    static async showArticleIndex(req, res) {
        try {
            const result = await Article.getArticles();
            if (result.error) return res.status(404).json({ error: result.error });
            const articles = result.articles;
            const formattedArticles = articles.map((article) => {
                const dateObj = new Date(article.created_at);
                return {
                    ...article,
                    formattedDate : dateObj.toLocaleDateString("en-US" ,
                        {
                            year:"numeric",
                            month:"long",
                            day:"numeric",
                        }),
                    shortExcerpt: article.excerpt.length > 150 ? article.excerpt.slice(0, 100) + "..." : article.excerpt,
                }
            });
            res.render("articles/index.ejs" , {articles:formattedArticles });
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
            const result = await Article.createArticle(
                title,
                category_id,
                excerpt,
                content,
                user_id,
                readTime,
                tags
            );
            console.log(result.rows);
            res.redirect("/articles");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error (create article failed)" });
        }
    }

    static async editArticle(req, res) {
        const id = parseInt(req.params.id);
        const result = await Article.getArticleById(id);
        if (result.error) return res.status(404).json({ error: result.error });
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
            const result = await Article.updateArticle(
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
