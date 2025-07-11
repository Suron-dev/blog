import express from "express";
import ArticleController from "../Controller/ArticleController.js";
import articleController from "../Controller/ArticleController.js";

const router = express.Router();

router.get("/edit/:id", articleController.editArticle);
router.put("/update/:id", ArticleController.updateArticle);
router.get("/create", articleController.createArticlePage);
router.post("/create", articleController.createArticle);
router.get("/:id", ArticleController.showArticle);
router.get("/", ArticleController.getAllArticles);

export default router;

