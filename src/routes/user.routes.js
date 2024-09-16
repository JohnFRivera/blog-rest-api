import { Router } from "express";
import {
  authenticate,
  createUser,
  updateUser,
  getCountUsers,
  getUserByPk,
  getAllUsers,
  getProfileImg,
} from "../controllers/user.controllers.js";

const router = Router();
/**
 * Public
 */
router.post("/user/auth", authenticate); //? Inicio de sesión
router.post("/user/create", createUser); //? Registrarse
router.get("/users/count", getCountUsers); //? Registrarse
router.get("/profile/:img", getProfileImg); //? Servir Imagen
/**
 * Private
 */
router.get("/admin/user/get/:id", getUserByPk); //? Traer usuario por id
router.get("/admin/users/get", getAllUsers); //? Traer todos los usuarios
router.put("/admin/user/update/:id", updateUser); //? Actualizar usuario

export default router;
