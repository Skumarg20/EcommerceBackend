import express from "express";
import userController from "./user.controller";

const userRouter=express.Router();

userRouter.post("/adduser",userController.addUser);
userRouter.get("/getAllUser",userController.getAllUser);
userRouter.patch("/updateUser/:id",userController.updateUser);
userRouter.patch("/changeUserPassword/:id",userController.changeUserPassword);
userRouter.delete("/deleteUser/:id",userController.deleteUser);
