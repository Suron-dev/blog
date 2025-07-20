import express from "express";
import AuthController from "../Controller/AuthController.js";

const router =  express.Router();

router.get("/login" , AuthController.showLogin);
router.get("/register" , AuthController.showRegister);


export default router;