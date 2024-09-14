import Comment from "../models/comment.js";
import User from "../models/user.js";

const createComment = async (req, res) => {
  try {
    let comment = await Comment.create(req.body);
    comment.dataValues.User = await User.findByPk(req.body.UserId, {
      attributes: ["photo", "name"],
    });
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const deleteComment = async (req, res) => {
  try {
    const affectedRows = await Comment.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send(affectedRows);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getAllCommentsByQuotePk = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      attributes: ["id", "description", "createdAt"],
      include: { model: User, attributes: ["photo", "name"] },
      where: { QuoteId: req.params.id },
      order: [["createdAt", "DESC"]]
    });
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};

export { createComment, deleteComment, getAllCommentsByQuotePk };
