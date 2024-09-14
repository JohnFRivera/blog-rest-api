import Author from "../models/author.js";
/**
 * Public
 */
const getAuthorByPk = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      attributes: ["photoUrl", "name", "occupation", "birth", "died"],
    });
    res.status(200).send(author);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(authors);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
/**
 * Private
 */
const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(200).send(author);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const updateAuthor = async (req, res) => {
  try {
    const affectedRows = await Author.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(affectedRows);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};

export { getAuthorByPk, getAllAuthors, createAuthor, updateAuthor };
