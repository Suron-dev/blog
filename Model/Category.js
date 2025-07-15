import db from "../config/db.js";

class Category {

    static async getAllCategories() {
        try {
            const {rows} = await db.query("SELECT * FROM category");
            if (rows.length === 0) return {message: "no category found" , categories : []};
            return {message: "category found", categories: rows};
        }catch(err){
            return {error: err.message + "failed to fetch all categories"};
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

    static async delete(id){
        if(!id || id === "") 
            return {error : "id required. id:" + id , statusCode: 400 } 
        try{
            const query = "DELETE FROM category WHERE id = $1";
            const result = await db.query(query , [id]);
            if (result.rowCount === 0) 
                return { error: "No category found with this ID" , statusCode:404 };
            return {message : "category deleted successfully" , statusCode : 200}
        }catch(e){
            return {error : e.message , statusCode : 500};
        }
    }

    static async showEditPage(id){
        if (!id || isNaN(id))
            return {error : "ID required. ID:" + id , statusCode: 400 } 
        try{
            const query = "SELECT * FROM category WHERE id = $1";
            const {rows} = await db.query(query , [id]);
            if(!rows[0])
                return { error : "Category not found!" , statusCode:404 }
            return {message: `category ${rows[0].name} found successfully.` , category: rows[0] , statusCode:200}
        }catch(e){
            return {error : e.message , statusCode:500}
        }
    }

}


export default Category;