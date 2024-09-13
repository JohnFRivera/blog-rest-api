import { Router } from "express";
import { getQuote, getAllQuotes, getAutorQuotes, createQuote, deleteQuote, updateQuote } from "../controllers/quote.controllers.js";
//Declaraciones
const router = Router();
/**
 * Public
 */
router.get("/quote/get/:id", getQuote);
router.get("/quote/getall", getAllQuotes);
router.get("/quote/autor/:id", getAutorQuotes);
/**
 * Private
 */
router.post("/admin/quote/create", createQuote);
router.put("/admin/quote/update/:id", updateQuote);
router.delete("/admin/quote/delete/:id", deleteQuote);
//Exportado
export default router;