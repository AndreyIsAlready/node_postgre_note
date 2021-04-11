import  { DataTypes } from "sequelize";
import connection from "../../core/loaders/db";

export default () => {
    const db = connection();
    const user = db.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            // @ts-ignore
            unique: {
                msg: "this username already exist",
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});

    return user;
};
