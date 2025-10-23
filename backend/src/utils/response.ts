import { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
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
  errors: any = null,
  status = 500
) => {
  const response: ApiResponse = {
    success: false,
    message,
    errors,
  };
  return res.status(status).json(response);
};
