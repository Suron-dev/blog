import db from "../config/db.js";


class Article {


    static async getArticles() {
        try {
            const {rows} = await db.query("SELECT * FROM article");
            if (rows.length === 0) throw new Error("no articles found");
            return {message: "Articles found successfully.", articles: rows};
        } catch (err) {
            return {error: err.message + "failed to get articles."};
        }
    }

    static async createArticle(title, category_id, excerpt, content, user_id, readTime, tags) {
        const values = [title, category_id, excerpt, content, user_id, readTime, tags];
        console.log(values);
        try {
            const result = await db.query(
                "INSERT INTO article (title, category_id, excerpt, content, user_id, read_time, tags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                values
            );
            return {
                message: "Article created successfully.",
                article: result.rows[0]
            };
        } catch (err) {
            return {
                error: err.message + " create article failed."
            };
        }
    }

    static async getArticleById(Id) {
        const articleId = parseInt(Id);
        if (isNaN(articleId)) {
            return {error: "invalid id"};
        }
        try {
            const {rows} = await db.query("SELECT * FROM article WHERE id = $1",
                [articleId]
            );
            if (rows.length === 0) {
                return {error: "article not found"};
            }
            return {
                message: "Article found successfully.",
                article: rows[0]
            }

        } catch (err) {
            console.error("error in getArticleById", err);
            return {
                error: err.message + " getArticleById() failed."
            }
        }
    }

    static async updateArticle(title, category_id, excerpt, content, user_id, read_time, tags, id) {
        const values = [title, category_id, excerpt, content, user_id, read_time, tags, id];
        try {
            const {rows} = await db.query(
                `UPDATE article
                 SET title = $1,
                     category_id = $2,
                     excerpt = $3,
                     content = $4,
                     user_id = $5,
                     read_time = $6,
                     tags = $7
                 WHERE id = $8 RETURNING *`,
                values
            );
            if (rows.length === 0) {
                return {error: "article not found"};
            }
            return {
                message: "Article updated successfully.",
                article: rows[0]
            }
        } catch (err) {
            console.error("error in updateArticle", err);
            return {error: err.message + " update article failed."}
        }
    }


}


export default Article;