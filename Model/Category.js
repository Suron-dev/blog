import db from "../config/db.js";

class Category {

    static async getAllCategories() {
        try {
            const {rows} = await db.query("SELECT * FROM category");
            if (rows.length === 0) return {message: "no category found" , categories : []};
            return {message: "category found", categories: rows};
        }catch(err){
            return {error: err.message};
        }
    }


    static async create(catName) {
        try {
            const query = "INSERT INTO category (name) VALUES ($1) RETURNING *";
            const { rows } = await db.query(query, [catName]);
            return rows[0];
        } catch (err) {
            return { error: err.message + " (create category failed)" };
        }
    }

}


export default Category;