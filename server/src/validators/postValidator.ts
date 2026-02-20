import { body } from "express-validator";

export const createPostValidator = [
  body("title").notEmpty().withMessage("Title required"),
  body("content").notEmpty().withMessage("Content required"),
];