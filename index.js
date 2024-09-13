import express from "express";
import cors from "cors";
import "dotenv/config";
import sequelize from "./src/models/config.js";
import user from "./src/routes/user.routes.js";
import author from "./src/routes/author.routes.js";
import quote from "./src/routes/quote.routes.js";
import comment from "./src/routes/comment.routes.js";
//Declaraciones
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(user);
app.use(author);
app.use(quote);
app.use(comment);
//Servidor
app.server = app.listen(PORT, () => {
    console.log(`_Servidor ejecutándose en_: http://${HOST}:${PORT}`);
});
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("_Sincronización realizada_");
    })
    .catch((error) => {
        console.error(`_Error en sincronización_: ${error}`);
    });