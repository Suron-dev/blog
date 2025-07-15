import Category from "../Model/Category.js";
import { createCategorySchema } from "../validations/categoryValidation.js";
import Utils from "../utils/Utils.js";


class categoryController {

    static async index(req, res) {
        try{
            const result = await Category.getAllCategories();
            const categories = result.categories;
            if (!categories) return res.status(500).json({ message: result.error });
            res.render("categories/index", { categories });
        }catch(err){
            res.status(500).json({message:"internal server error . failed to show all categories"});
        }
    }

    static async showCreateForm(req , res) {
        try{
            res.render("categories/create");
        }catch(err){
            res.status(500).json({message:"internal server error . failed to show create category form"});
        }
    }

    static async createCategory(req, res) {
        let { category } = req.body;
        if (!category || category.trim() === "") {
            return res.status(400).json({ message: "Category name is required." });
        }
        category = Utils.capitalize(category);
        try {
            const result = await Category.getAllCategories();
            const categories = result.categories;
            if (!categories) return res.status(500).json({ message: result.error });
            const exists = categories.some(c => c.name.toLowerCase() === category.toLowerCase());
            if (exists) return res.status(409).json({ message: "Category already exists" });
            const newCategory = await Category.create(category);
            if (newCategory.error) return res.status(500).json({ message: newCategory.error });

            res.status(201).json({ message: "Category created successfully", category: newCategory });
        } catch (err) {
            res.status(500).json({ message: "Unexpected error in createCategory" });
        }
    }

}


export default categoryController;