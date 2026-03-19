import { Request, Response } from "express";
import { serviceSchema } from "../validation/serviceSchema";
import fs from "fs/promises";
import db from "../db";
import { serviceTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { errorResponse, successResponse } from "../utils/response";

const UPLOAD_PATH = "public/uploads";

// CREATE SERVICE
export const createService = async (req: Request, res: Response) => {
  const imageFile = req.file;
  const parsed = serviceSchema.safeParse(req.body);

  if (!parsed.success) {
    if (imageFile) {
      await fs
        .unlink(`${UPLOAD_PATH}/${imageFile.filename}`)
        .catch((err) =>
          console.error("Failed to unlink on validation error:", err)
        );
    }
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  // image required
  if (!imageFile) return errorResponse(res, "Image file is required", 400);

  const { title, description } = parsed.data;
  const imageUrl = `/uploads/${imageFile?.filename}`;

  const service = await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.title, title))
    .then((rows) => rows[0]);

  // check the same title
  if (service) {
    await fs.unlink(`${UPLOAD_PATH}/${imageFile?.filename}`);
    return errorResponse(res, "Service already exists", 400);
  }

  try {
    // create new service
    const create = await db
      .insert(serviceTable)
      .values({
        title,
        description,
        imageUrl,
      })
      .returning()
      .then((rows) => rows[0]);

    return successResponse(res, "Create service successfully!", create, 200);
  } catch (error) {
    if (imageFile) {
      // Delete uploaded files
      await fs
        .unlink(`${UPLOAD_PATH}/${imageFile.filename}`)
        .catch((err) => console.error("Failed to unlink after DB error:", err));
    }
    console.error("Database insert error:", error);
  }
};

// GET ALL SERVICE
export const getServices = async (req: Request, res: Response) => {
  const service = await db.select().from(serviceTable);

  return successResponse(res, "Get all services", service);
};

// GET DETAIL SERVICE
export const getDetailService = async (req: Request, res: Response) => {
  const { id } = req.params;

  const service = await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.id, id))
    .then((rows) => rows[0]);

  // check service if not found
  if (!service) return errorResponse(res, "Service not found", 404);

  successResponse(res, "Get detail service", service);
};

// UPDATE SERVICE
export const updateService = async (req: Request, res: Response) => {
  const imageFile = req.file;
  const parsed = serviceSchema.safeParse(req.body);

  if (!parsed.success) {
    if (imageFile) {
      await fs
        .unlink(`${UPLOAD_PATH}/${imageFile.filename}`)
        .catch((err) =>
          console.error("Failed to unlink on validation error:", err)
        );
    }
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  // image required
  if (!imageFile) return errorResponse(res, "Image file is required", 400);

  const { id } = req.params;
  const { title, description } = parsed.data;
  const image = `/uploads/${imageFile?.filename}`;

  const service = await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.id, id))
    .then((rows) => rows[0]);

  // check service if not found
  if (!service) {
    if (imageFile) {
      await fs
        .unlink(`${UPLOAD_PATH}/${imageFile.filename}`)
        .catch((err) =>
          console.error("Failed to unlink on not found error:", err)
        );
    }
    return errorResponse(res, "Service not found", 404);
  }

  // delete old image and replace new image
  if (service.imageUrl) {
    const oldImage = service.imageUrl.replace("/uploads/", "");
    await fs
      .unlink(`${UPLOAD_PATH}/${oldImage}`)
      .catch((err) =>
        console.warn("Old image not found or failed to delete", err)
      );
  }

  try {
    await db.update(serviceTable).set({
      title,
      description,
      imageUrl: image,
    });

    return successResponse(res, "Update service successfully!", service, 200);
  } catch (error) {
    if (imageFile) {
      // Delete uploaded files
      await fs
        .unlink(`${UPLOAD_PATH}/${imageFile.filename}`)
        .catch((err) => console.error("Failed to unlink after DB error:", err));
    }
    console.error("Database insert error:", error);
  }
};

// DELETE SERVICE
export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;

  const service = await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.id, id))
    .then((rows) => rows[0]);

  // check service if not found
  if (!service) return errorResponse(res, "Service not found", 404);

  // delete image
  if (service.imageUrl) {
    const filename = service.imageUrl.replace("/uploads/", "");
    await fs
      .unlink(`${UPLOAD_PATH}/${filename}`)
      .catch((err) => console.warn("Failed to remove image:", err));
  }

  await db.delete(serviceTable).where(eq(serviceTable.id, id));

  return successResponse(res, "Delete service successfully!", service, 200);
};
