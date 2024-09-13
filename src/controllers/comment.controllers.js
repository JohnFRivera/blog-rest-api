import Comment from "../models/comment.js";
import User from "../models/user.js";
//Controladores
const createComment = async (req, res) => {
  try {
    let newComment = (await Comment.create(req.body)).dataValues;
    const userData = (
      await User.findByPk(parseInt(newComment.UserId), {
        attributes: ["photo", "name"],
      })
    ).dataValues;
    newComment.User = userData;
    res.status(200).send(newComment);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send(deletedComment);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const getQuoteComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      attributes: ["id", "description", "createdAt"],
      include: { model: User, attributes: ["photo", "name"] },
      where: { QuoteId: req.params.id },
      order: [["createdAt", "DESC"]]
    });
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).send({ error });
  }
};
//Exportado
export { createComment, deleteComment, getQuoteComments };
