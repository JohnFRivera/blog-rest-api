import { Router } from "express";
import { getAuthorByPk, getAllAuthors, createAuthor, updateAuthor } from "../controllers/author.controllers.js";
//Declaraciones
const router = Router();
/**
 * Public
 */
router.get("/author/get/:id", getAuthorByPk); //? Traer autor por su id
router.get("/authors/getall", getAllAuthors); //? Traer todos los autores
/**
 * Private
 */
router.post("/admin/author/create", createAuthor); //? Crear autor
router.put("/admin/author/update/:id", updateAuthor); //? Editar autor por su id
//Exportado
export default router;