import Category from "../Model/Category.js";
// import { createCategorySchema } from "../validations/categoryValidation.js";
import Utils from "../utils/Utils.js";

class CategoryController {
    static async index(req, res) {
        try {
            const result = await Category.getAllCategories();
            const categories = result.categories;
            if (!categories) return res.status(500).json({ message: result.error });
            res.render("categories/index", { categories });
        } catch (err) {
            res.status(500).json({ message: "internal server error . failed to show all categories" });
        }
    }

    static async showCreateForm(req, res) {
        try {
            res.render("categories/create");
        } catch (err) {
            res.status(500).json({ message: "internal server error . failed to show create category form" });
        }
    }

    static async createCategory(req, res) {
        let { category_name } = req.body;
        if (!category_name || category_name.trim() === "") {
            return res.status(400).json({ message: "Category name is required." });
        }
        category_name = Utils.capitalize(category_name);
        try {
            const result = await Category.getAllCategories();
            const categories = result.categories;
            if (!categories) return res.status(500).json({ message: result.error });
            const exists = categories.some((c) => c.name.toLowerCase() === category_name.toLowerCase());
            if (exists) return res.status(409).json({ message: "Category already exists" });
            const newCategory = await Category.create(category_name);
            if (newCategory.error) return res.status(500).json({ message: newCategory.error });
            res.redirect("/category/create");
            // res.status(201).json({ message: "Category created successfully", category: newCategory });
        } catch (err) {
            res.status(500).json({ message: "Unexpected error in createCategory" });
        }
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id);
        if (!id || id === "" || isNaN(id)) return res.status(400).send({ error: "Please Enter Valid Id" });
        try {
            const result = await Category.delete(id);
            if (result.error) {
                return res.status(result.statusCode).send({ message: result.error });
            } else {
                res.redirect("/category")
            }
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }

    static async showEditPage(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send({ error: "Please Enter Valid Id" });
        try {
            const result = await Category.showEditPage(id);
            if (result.error) return res.status(result.statusCode).send({ error: result.error });
            console.log(result.message);
            res.render("categories/edit", { category: result.category });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async update(req, res) {
        const id = parseInt(req.params.id);
        let category_name = req.body.category_name;
        console.log(req.body);
        if (!category_name || category_name.trim() === "") {
            return res.status(400).json({ message: "Category name is required." });
        }
        if (!id || isNaN(id)) return res.status(400).send("please select a valid category");
        category_name = Utils.capitalize(category_name.trim());
        try {
            const result = await Category.update(id, category_name);
            if (result.error) return res.status(result.statusCode).send(result.error);
            res.redirect("/category");
        } catch (e) {
            return res.status(500).send("Internal Server Error to update Category " + e.message);
        }
    }
}

export default CategoryController;
