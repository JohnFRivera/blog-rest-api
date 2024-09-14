import { Router } from "express";
import { getAllCommentsByQuotePk, createComment, deleteComment } from "../controllers/comment.controllers.js";

const router = Router();
/**
 * Public
 */
router.get("/comment/quote/:id", getAllCommentsByQuotePk); //? Traer comentario por el id de la cita
router.post("/comment/create", createComment); //? Crear comentario
router.delete("/comment/delete/:id", deleteComment); //? eliminar comentario

export default router;