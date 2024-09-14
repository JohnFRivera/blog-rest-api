import { DataTypes } from "sequelize";
import sequelize from "./config.js";
import Quote from "./quote.js";
//Modelo
const Author = sequelize.define(
  "Author",
  {
    photoUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    occupation: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    birth: {
      type: DataTypes.STRING(9),
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    died: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
  }
);
//Relaciones
Author.hasMany(Quote);
Quote.belongsTo(Author);

export default Author;
