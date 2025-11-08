import {Router} from 'express'
import { verifyToken } from '../middlewares/auth'
import { createService, deleteService, getDetailService, getServices, updateService } from '../controllers/serviceController'
import upload from '../utils/multer'

const serviceRoute = Router()

serviceRoute.post('/', verifyToken, upload.single('imageUrl'),createService)
serviceRoute.get('/', getServices)
serviceRoute.get("/:id", getDetailService)
serviceRoute.put("/:id", verifyToken,upload.single('imageUrl'), updateService)
serviceRoute.delete("/:id", verifyToken, deleteService)

export default serviceRoute