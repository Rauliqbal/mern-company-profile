import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// Locate Storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Filter File
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/svg+xml",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported"));
  }
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
});

export default upload;