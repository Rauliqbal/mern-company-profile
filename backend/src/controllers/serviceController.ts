import { Request, Response } from "express";
import { serviceSchema } from "../validation/serviceSchema";
import db from "../db";
import { serviceTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { errorResponse, successResponse } from "../utils/response";

// CREATE SERVICE
export const createService = async (req: Request, res: Response) => {
  const parsed = serviceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { title, description } = parsed.data;
  const imageFile = req.file;
  const image = imageFile ? `/uploads/${imageFile?.filename}` : null;

  // check the same title
  const checkService = await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.title, title))
    .then((rows) => rows[0]);

  if (checkService) return errorResponse(res, "Service already exists", 400);

  // create new service
  const create = await db
    .insert(serviceTable)
    .values({
      title,
      description,
      image,
    })
    .returning()
    .then((rows) => rows[0]);

  return successResponse(res, "Create service successfully!", create, 200);
};

// GET ALL SERVICE
export const getServices = async (req: Request, res: Response) => {
  const service = await db.select().from(serviceTable);

  return successResponse(res, "Get all services" ,service );
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
  const parsed = serviceSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { id } = req.params;
  const { title, description } = parsed.data;
  const imageFile = req.file;
  const image = imageFile ? `/uploads/${imageFile?.filename}` : null;

  const service = await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.id, id))
    .then((rows) => rows[0]);

  // check service if not found
  if (!service) return errorResponse(res, "Service not found", 404);

  await db.update(serviceTable).set({
    title,
    description,
    image,
  });

  return successResponse(res, "Update service successfully!", service , 200)
};

// DELETE SERVICE
export const deleteService = async(req:Request, res:Response) => {
  const {id} = req.params

  const service = await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.id, id))
    .then((rows) => rows[0]);
  
    // check service if not found
  if (!service) return errorResponse(res, "Service not found", 404);

  await db.delete(serviceTable).where(eq(serviceTable.id,id))

  return successResponse(res, "Delete service successfully!", service , 200)
}