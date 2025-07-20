import Article from "../Model/Article.js";
import Category from "../Model/Category.js";
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
                    formattedDate: dateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                    shortExcerpt:
                        article.excerpt.length > 150
                            ? article.excerpt.slice(0, 100) + "..."
                            : article.excerpt,
                };
            });
            res.render("articles/index.ejs", { articles: formattedArticles });
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
        const result = await Category.getAllCategories();
        const categories = result.categories;
        res.render("articles/create", { categories: categories, article: {} });
    }

    static async createArticle(req, res) {
        const { error, value } = createArticleSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((e) => e.message);
            const { categories } = await Category.getAllCategories();

            return res.status(400).render("articles/create", {
                errors,
                article: value,
                categories,
            });
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
            console.log(result);

            if (result.error) {
                const { categories } = await Category.getAllCategories();
                return res.status(result.statusCode || 500).render("articles/create", {
                    errors: [result.error],
                    article: value,
                    categories,
                });
            }
            return res.redirect("/articles");
        } catch (err) {
            console.error("Error in createArticle:", err.message);
            const { categories } = await Category.getAllCategories();

            return res.status(500).render("articles/create", {
                errors: ["Internal Server Error (create article failed)"],
                article: value,
                categories,
            });
        }
    }

    static async editArticle(req, res) {
        const id = parseInt(req.params.id);
        const result = await Article.getArticleById(id);
        if (result.error) return res.status(404).json({ error: result.error });
        const { categories } = await Category.getAllCategories();
        return res.render("articles/edit", { article: result.article, categories: categories });
    }

    static async updateArticle(req, res) {
        delete req.body._method;

        const id = parseInt(req.params.id);
        if (!id || isNaN(id)) {
            return res.status(400).send("Invalid article ID");
        }

        const { error, value } = updateArticleSchema.validate(req.body, {
            abortEarly: false,
            allowUnknown: true,
        });

        if (error) {
            const errors = error.details.map((e) => e.message);
            const { categories } = await Category.getAllCategories();
            return res.status(400).render("articles/edit", {
                errors,
                article: { ...value, id },
                categories,
            });
        }

        if (!value.excerpt || value.excerpt.trim() === "") {
            value.excerpt = value.content.slice(0, 150);
        }

        try {
            const { title, category_id, excerpt, content, user_id, readTime, tags } = value;

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

            if (result.error) {
                const { categories } = await Category.getAllCategories();
                return res.status(result.statusCode || 500).render("articles/edit", {
                    errors: [result.error],
                    article: { ...value, id },
                    categories,
                });
            }

            return res.redirect("/articles");
        } catch (err) {
            console.error("Update failed:", err.message);
            const { categories } = await Category.getAllCategories();
            return res.status(500).render("articles/edit", {
                errors: ["Internal Server Error (update failed)"],
                article: { ...value, id },
                categories,
            });
        }
    }

    


}

export default ArticleController;
