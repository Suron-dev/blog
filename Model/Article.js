import db from "../config/db.js";

class Article {


    static async getArticles() {
        try {
            const {rows} = await db.query("SELECT * FROM article");
            if (rows.length === 0) throw new Error("no articles found");
            return {message : "Articles found successfully." , articles: rows};
        }catch(err) {
            return {error : err.message + "failed to get articles."};
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







}


export default Article;