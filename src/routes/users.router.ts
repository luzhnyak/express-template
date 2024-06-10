import express from "express";
// import validateBody from "../../middlewares";
// import orderSchema from "../../shemas/order";
import ctrl from "../controllers/users.controler";
import { aunthenticate } from "../middlewares/authenticate";

const userRouter = express.Router();

userRouter.get("/refresh", aunthenticate, ctrl.refreshUser);

userRouter.post("/register", ctrl.register);

userRouter.post("/login", ctrl.login);

userRouter.get("/logout", aunthenticate, ctrl.logout);

userRouter.get("/:id", ctrl.getUserById);

export default userRouter;
