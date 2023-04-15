import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { deleteUser, getUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);

export default router;