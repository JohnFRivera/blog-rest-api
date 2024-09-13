import { hash, compare } from "bcrypt";
import multer from "multer";
import sharpMulter from "sharp-multer";
import path from "path";
import "dotenv/config";
import User from "../models/user.js";
//Controladores
const authenticate = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      //valid password
      compare(req.body.password, user.password, (error, result) => {
        if (!error) {
          if (result) {
            var userData = {
              userId: user.id,
              userPhoto: `${process.env.RENDER_URL}/profile/${user.photo}`,
              userName: user.name,
            };
            if (user.role == "Administrador") {
              userData.isAdmin = true;
            };
            res.status(200).send(userData);
          } else {
            res.status(400).send({ error: "La contraseña es incorrecta" });
          }
        } else {
          res.status(500).send({ error });
        }
      });
    } else {
      res.status(403).send({ error: "El email no está registrado" });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};
//Crear usuario y almacenar imagen
let globalPhotoName = "user-tumbnail.jpg";
const storage = sharpMulter({
  destination: (req, file, cb) => cb(null, path.resolve("public/uploads")),
  imageOptions: {
    fileFormat: "jpg",
    quality: 75,
    resize: { width: 130, height: 130 },
  },
  filename: (originalname, options, req) => {
    globalPhotoName = `${Date.now()}.${options.fileFormat}`;
    return globalPhotoName;
  },
});
const getUploadMiddleware = () => {
  return multer({ storage });
};
const createUser = async (req, res) => {
  try {
    const validEmail = await User.findOne({ where: { email: req.body.email } });
    if (!validEmail) {
      hash(req.body.password, 10, async (error, hash) => {
        if (!error) {
          req.body.photo = globalPhotoName;
          req.body.password = hash;
          let newUser = (await User.create(req.body)).dataValues;
          var photo = newUser.photo;
          newUser.photo = `${process.env.RENDER_URL}/profile/${photo}`;
          globalPhotoName = "user-tumbnail.jpg";
          res.status(200).send(newUser);
        } else {
          res.status(500).send({ error });
        }
      });
    } else {
      res.status(500).send({ error: "El email ya está registrado" });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const getUser = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "photo", "name", "email", "role", "state"],
      order: [["createdAt", "DESC"]],
    });
    var modifyUsers = users.map((user) => {
      return {
        id: user.id,
        photo: `${process.env.RENDER_URL}/profile/${user.photo}`,
        name: user.name,
        email: user.email,
        role: user.role,
        state: user.state
      }
    });
    res.status(200).send(modifyUsers);
  } catch (error) {
    res.status(400).send({ error });
  }
};
const getImage = async (req, res) => {
  const imageName = req.params.img;
  res.sendFile(path.resolve("public/uploads", imageName), (error) => {
    if (error) {
      res.status(404).send({
        message: "Imagen no encontrada",
        error,
      });
    }
  });
};
//Exportado
export {
  authenticate,
  getUploadMiddleware,
  createUser,
  updateUser,
  getUser,
  getAllUser,
  getImage,
};
