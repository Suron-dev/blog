import express from "express";
import categoryController from "../Controller/CategoryController.js";
const router = express.Router();

router.get("/", categoryController.index);
router.get("/create", categoryController.showCreateForm);
router.post("/" , categoryController.createCategory);

export default router;
