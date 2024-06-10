import { Request, Response } from "express";

import { HttpError, ctrlWrapper } from "../helpers";
import { PostsService } from "../services/posts.service";

// ============================== Get All

const getAllPosts = async (req: Request, res: Response) => {
  const posts = await PostsService.getAllPosts();
  console.log(posts);

  res.json({ data: posts });
};

// ============================== Get by ID

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await PostsService.getPostById(+id);

  res.json({ data: post });
};

export default {
  getAllPosts: ctrlWrapper(getAllPosts),
  getPostById: ctrlWrapper(getPostById),
};
