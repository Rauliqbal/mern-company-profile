import jwt from 'jsonwebtoken'
import config from '../config'

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    config.JWT_ACCESS_TOKEN,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { id: user.id },
    config.JWT_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
};
