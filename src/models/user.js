import { DataTypes } from "sequelize";
import sequelize from "./config.js";
import Comment from "./comment.js";
//Modelo
const User = sequelize.define("User", {
  photo: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: "user-tumbnail.jpg",
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 8,
    },
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "Usuario",
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
});
//Relaciones
User.hasMany(Comment);
Comment.belongsTo(User);
//Exportado
export default User;
