import Quote from "../models/quote.js";
import Author from "../models/author.js";
//Controladores
const createQuote = async (req, res) => {
  try {
    let quoteData = (await Quote.create(req.body)).dataValues;
    const authorData = (
      await Author.findByPk(parseInt(quoteData.AuthorId), {
        attributes: ["id", "photoUrl", "name"],
      })
    ).dataValues;
    quoteData.Author = authorData;
    res.status(200).send(quoteData);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const updateQuote = async (req, res) => {
  try {
    const updatedQuote = await Quote.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(updatedQuote);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await Quote.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send({
      message: "Cita Eliminado correctamente",
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      attributes: ["id", "description", "reference"],
      include: { model: Author, attributes: ["id", "photoUrl", "name"] },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const getAutorQuotes = async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      attributes: ["id", "description", "reference"],
      where: { AuthorId: req.params.id },
    });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const getQuote = async (req, res) => {
  try {
    const quotes = await Quote.findByPk(req.params.id, {
      attributes: ["id", "description", "reference", "createdAt"],
    });
    res.status(200).send(quotes);
  } catch (error) {
    res.status(400).send({ error });
  }
};
//Exportado
export {
  createQuote,
  updateQuote,
  deleteQuote,
  getAllQuotes,
  getAutorQuotes,
  getQuote,
};
