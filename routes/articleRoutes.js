//articleRoutes
import express from "express";
import articleController from "../Controller/ArticleController.js";

const router = express.Router();

router.get("/edit/:id", articleController.editArticle);
router.put("/update/:id", articleController.updateArticle);
router.get("/create", articleController.createArticlePage);
router.post("/create", articleController.createArticle);
router.get("/:id", articleController.showArticle);
router.get("/", articleController.showArticleIndex);

export default router;

