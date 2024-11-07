import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  });

  export const checkDbConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connected to user database successfully");
        return true;
    } catch (error) {
        console.error("Failed or error whiles connection to the user database at: ", error.message);
        return false;
    }
  }

  export default sequelize;