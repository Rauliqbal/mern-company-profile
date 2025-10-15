import { PrismaClient } from "../generated/prisma";

interface Config {
  nodeEnv: string;
  port: number;
  accessToken: string;
  refreshToken: string;
}

export const config: Config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 8000,
  accessToken: process.env.JWT_ACCESS_TOKEN || "rahasia",
  refreshToken: process.env.JWT_REFRESH_TOKEN || "rahasia",
};

export const prisma = new PrismaClient();
