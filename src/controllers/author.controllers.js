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
    res.status(400).send({ error });
  }
};
/**
 * Private
 */
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      attributes: ["id", "photoUrl", "name", "occupation"],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(authors);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const createAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body, {
      attributes: ["id", "photoUrl", "name", "occupation"],
    });
    res.status(200).send(newAuthor);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const updateAuthor = async (req, res) => {
  try {
    const rowsAffected = await Author.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsAffected > 0) {
      res.status(200).send({ message: "Editado correctamente" });
    } else {
      res.status(400).send({ error: "No se pudo editar el autor" });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};
//Exportado
export { getAuthorByPk, getAllAuthors, createAuthor, updateAuthor };
