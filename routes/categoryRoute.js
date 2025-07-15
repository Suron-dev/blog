import express from "express";
import CategoryController from "../Controller/CategoryController.js";
const router = express.Router();

router.get("/", CategoryController.index);
router.get("/create", CategoryController.showCreateForm);
router.get("/edit/:id" , CategoryController.showEditPage);
router.post("/" , CategoryController.createCategory);

export default router;
