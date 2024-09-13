import { Router } from "express";
import {
  authenticate,
  getUploadMiddleware,
  createUser,
  updateUser,
  getUser,
  getAllUser,
  getImage,
} from "../controllers/user.controllers.js";
//Declaraciones
const router = Router();
const upload = getUploadMiddleware();
/**
 * Public
 */
router.post("/user/auth", authenticate);
router.post("/user/create", upload.single("photo"), createUser);
router.get("/profile/:img", getImage);
/**
 * Private
 */
router.get("/admin/user/get/:id", getUser);
router.get("/admin/user/get", getAllUser);
router.put("/admin/user/update/:id", updateUser);
//Exportado
export default router;
