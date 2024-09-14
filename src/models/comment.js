import { DataTypes } from "sequelize";
import sequelize from "./config.js";
//Modelo
const Comment = sequelize.define("Comment", {
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

export default Comment;
