import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { createUser, findUserByEmail } from "../repositories/userRepository";

export async function registerUser(params: {
  email: string;
  password: string;
  fullName: string;
}) {
  const existing = await findUserByEmail(params.email);
  if (existing) {
    const error: any = new Error("Email already registered");
    error.status = 400;
    throw error;
  }

  const hashed = await bcrypt.hash(params.password, 10);
  const user = await createUser({
    email: params.email,
    password: hashed,
    fullName: params.fullName,
  });

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
}

export async function loginUser(params: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(params.email);
  if (!user) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const ok = await bcrypt.compare(params.password, user.password);
  if (!ok) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
  };
}


