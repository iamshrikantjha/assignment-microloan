import { Router } from "express";
import { registerUser, loginUser } from "../services/authService";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "email, password and fullName are required" });
    }

    const user = await registerUser({ email, password, fullName });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const result = await loginUser({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
});


