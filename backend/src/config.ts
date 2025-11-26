import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  jwtExpiresIn: "1h",
  databaseUrl: process.env.DATABASE_URL || "file:./dev.db",
  logLevel: process.env.LOG_LEVEL || "info",
};


