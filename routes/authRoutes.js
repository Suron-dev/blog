import express from "express";
import AuthController from "../Controller/AuthController.js";
import passport from "../config/passport.js";

const router =  express.Router();

router.get("/login" , AuthController.showLogin);
router.get("/register" , AuthController.showRegister);
router.post("/register" , AuthController.register);
router.post("/login", AuthController.login);

export default router;