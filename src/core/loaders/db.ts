import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DB, process.env.P_USER, process.env.P_PASSWORD, {
    host: "postgres",
    dialect: "postgres"
});

export default (): Sequelize => db;
