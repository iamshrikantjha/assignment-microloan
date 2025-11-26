import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { findUserById } from "../repositories/userRepository";

export const usersRouter = Router();

usersRouter.get("/profile", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
});


