import { hash, compare } from "bcrypt";
import multer from "multer";
import sharpMulter from "sharp-multer";
import path from "path";
import "dotenv/config";
import User from "../models/user.js";

const authenticate = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      //? valid password
      compare(req.body.password, user.password, (error, result) => {
        if (!error) {
          if (result) {
            var userData = {
              userId: user.id,
              userPhoto: user.photo,
              userName: user.name,
            };
            //? valid admin
            if (user.role == "Administrador") {
              userData.isAdmin = true;
            }
            res.status(200).send(userData);
          } else {
            res.status(400).send({ error: "La contraseña es incorrecta" });
          }
        } else {
          res
            .status(500)
            .send({ error: "Error de encriptación", result: error });
        }
      });
    } else {
      res.status(403).send({ error: "El email no está registrado" });
    }
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const createUser = async (req, res) => {
  try {
    const validEmail = await User.findOne({ where: { email: req.body.email } });
    if (!validEmail) {
      hash(req.body.password, 10, async (error, hash) => {
        if (!error) {
          req.body.photo = `tumbnail-${Math.floor(Math.random() * 9) + 1}.jpg`;
          req.body.password = hash;
          let newUser = await User.create(req.body);
          res.status(200).send(newUser);
        } else {
          res
            .status(500)
            .send({ error: "Error al encriptar contraseña", result: error });
        }
      });
    } else {
      res.status(500).send({ error: "El email ya está registrado" });
    }
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const updateUser = async (req, res) => {
  try {
    const affectedRows = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(affectedRows);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getCountUsers = async (req, res) => {
  try {
    let count = await User.count();
    res.status(200).send({ count });
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getUserByPk = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "photo",
        "name",
        "email",
        "role",
        "state",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: "Error en la consulta", result: error });
  }
};
const getProfileImg = async (req, res) => {
  res.sendFile(path.resolve("./public/uploads/", req.params.img), (error) => {
    if (error) {
      res.status(404).send({
        error: "Imagen no encontrada",
        result: error,
      });
    }
  });
};

export {
  authenticate,
  createUser,
  updateUser,
  getCountUsers,
  getUserByPk,
  getAllUsers,
  getProfileImg,
};
