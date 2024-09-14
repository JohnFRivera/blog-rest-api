import { Sequelize } from "sequelize";
import "dotenv/config";
//Variables de entorno
const DIALECT = process.env.DB_DIALECT;
const DATABASE = process.env.DB_DATABASE;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
//Procesos
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT
});
sequelize.authenticate()
    .then(() => console.log("_Conexión establecida_"))
    .catch((error) => console.error(`_Conexión erronea_: ${error}`));

export default sequelize;