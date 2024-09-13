import { Router } from "express";
import { getQuoteComments, createComment, deleteComment } from "../controllers/comment.controllers.js";
//Declaraciones
const router = Router();
/**
 * Public
 */
router.get("/comment/quote/:id", getQuoteComments);
router.post("/comment/create", createComment);
router.delete("/comment/delete/:id", deleteComment);
//Exportado
export default router;