import express from "express";
import * as authController from "./auth.controller";

const authRouter=express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);

export default authRouter;