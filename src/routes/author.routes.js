import { Router } from "express";
import { getAuthorByPk, getAllAuthors, createAuthor, updateAuthor } from "../controllers/author.controllers.js";
//Declaraciones
const router = Router();
/**
 * Public
 */
router.get("/author/get/:id", getAuthorByPk);
router.get("/author/getall", getAllAuthors);
/**
 * Private
 */
router.post("/admin/author/create", createAuthor);
router.put("/admin/author/update/:id", updateAuthor);
//Exportado
export default router;