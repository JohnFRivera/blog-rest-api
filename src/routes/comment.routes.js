import { Router } from "express";
import { getQuoteComments, createComment, deleteComment } from "../controllers/comment.controllers.js";

const router = Router();
/**
 * Public
 */
router.get("/comment/quote/:id", getQuoteComments); //? Traer comentario por el id de la cita
router.post("/comment/create", createComment); //? Crear comentario
router.delete("/comment/delete/:id", deleteComment); //? eliminar comentario

export default router;