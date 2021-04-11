import { DataTypes } from "sequelize";
import User from "../../user/models/user";
import connection from "../../core/loaders/db";

export default () => {
    const db = connection();
    const user = User();

    const note = db.define("note", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 1000],
                    msg: "String length is not in this range"
                }
            }
        },
        shareNote: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {});

    user.hasMany(note);

    return note;
};
