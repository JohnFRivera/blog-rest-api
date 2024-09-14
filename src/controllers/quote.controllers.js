import Quote from "../models/quote.js";
import Author from "../models/author.js";

const createQuote = async (req, res) => {
  try {
    let quote = await Quote.create(req.body);
    quote.dataValues.Author = await Author.findByPk(req.body.authorId, {
      attributes: ["id", "photoUrl", "name"],
    });
    res.status(200).send(quote);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const updateQuote = async (req, res) => {
  try {
    const affectedRows = await Quote.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(affectedRows);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const deleteQuote = async (req, res) => {
  try {
    const affectedRows = await Quote.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send(affectedRows);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      attributes: ["id", "description", "reference", "createdAt", "updatedAt"],
      include: { model: Author, attributes: ["id", "photoUrl", "name"] },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getAllQuotesByAuthorPk = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      attributes: ["id", "description", "reference"],
      where: { AuthorId: req.params.id },
    });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getQuote = async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id, {
      attributes: ["id", "description", "reference", "createdAt", "updatedAt"],
    });
    res.status(200).send(quote);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};

export {
  createQuote,
  updateQuote,
  deleteQuote,
  getAllQuotes,
  getAllQuotesByAuthorPk,
  getQuote,
};
