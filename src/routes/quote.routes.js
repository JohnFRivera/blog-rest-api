import { Router } from "express";
import { getQuoteByPk, getAllQuotes, getAllQuotesByAuthorPk, createQuote, deleteQuote, updateQuote } from "../controllers/quote.controllers.js";

const router = Router();
/**
 * Public
 */
router.get("/quote/get/:id", getQuoteByPk); //? Traer cita por id
router.get("/quotes/get", getAllQuotes); //? Traer todas las citas
router.get("/quotes/autor/:id", getAllQuotesByAuthorPk); //? Traer todas las citas de autor por su id
/**
 * Private
 */
router.post("/admin/quote/create", createQuote); //? Crear cita
router.put("/admin/quote/update/:id", updateQuote); //? Actualizar cita
router.delete("/admin/quote/delete/:id", deleteQuote); //? Eliminar cita

export default router;