import { Request, Response } from "express";
import Post from "../models/Post";
import logger from "../utils/logger";
import { AuthRequest } from "../middlewares/authMiddleware";
import User from "../models/User";

// CREATE POST
export const createPost = async (req: AuthRequest, res: Response) => {
  logger.info("in create post function");
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findOne({ _id: req.user.id });
  // console.log("user",user)

  const post = await Post.create({
    ...req.body,
    authorId:req.user.id,
    author: user?.name,
  });

  res.status(201).json(post);
};

// GET ALL POSTS
export const getPosts = async (_: Request, res: Response) => {
  const posts = await Post.find().populate("author", "name email");
  res.json(posts);
};

// GET SINGLE POST
export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post not found" });

  res.json(post);
};

// UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(post);
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};
