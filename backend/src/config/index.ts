import dotenv from "dotenv";
dotenv.config()

const config = {
  NODE_ENV: process.env.NODE_END || 'development',
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN || "rahasia" ,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || "rahasia",
};

export default config;