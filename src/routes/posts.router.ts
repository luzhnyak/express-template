import express from "express";

import ctrl from "../controllers/posts.controler";

const postsRouter = express.Router();

postsRouter.get("/", ctrl.getAllPosts);

postsRouter.get("/:id", ctrl.getPostById);

export default postsRouter;
