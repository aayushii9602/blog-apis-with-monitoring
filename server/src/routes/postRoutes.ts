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


const router = express.Router();

router.post("/", createPostValidator, validate, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;