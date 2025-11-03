import { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  status = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(status).json(response);
};

export const errorResponse = (
  res: Response,
  message: string,
  status : number = 500,
) => {
  const response: ApiResponse = {
    success: false,
    message,
  };
  return res.status(status).json(response);
};
