import express from "express";
import ArticleController from "../Controller/ArticleController.js";
import articleController from "../Controller/ArticleController.js";

const router = express.Router();

router.get("/" , ArticleController.getAllArticles);
router.post("/create" , articleController.createArticle);


export default router;

