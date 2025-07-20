import express from "express";
import CategoryController from "../Controller/CategoryController.js";

const router = express.Router();

router.get("/", CategoryController.index);
router.get("/create", CategoryController.showCreateForm);
router.get("/edit/:id" , CategoryController.showEditPage);
router.put("/update/:id" , CategoryController.update);
router.post("/" , CategoryController.createCategory);
router.delete("/delete/:id" , CategoryController.delete);


export default router;
