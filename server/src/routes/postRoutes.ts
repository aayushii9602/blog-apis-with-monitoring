import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { createPostValidator } from "../validators/postValidator";
import { validate } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", authMiddleware, createPostValidator, validate, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
