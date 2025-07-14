import express from "express";
import homeController from "../Controller/HomeController.js";

const router =  express.Router();


router.get("/" , homeController.index);


export default router;