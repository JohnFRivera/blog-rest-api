import { DataTypes } from "sequelize";
import sequelize from "./config.js";
import Comment from "./comment.js";
//Modelo
const Quote = sequelize.define("Quote", {
  description: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});
//Relaciones
Quote.hasMany(Comment);
Comment.belongsTo(Quote);

export default Quote;
