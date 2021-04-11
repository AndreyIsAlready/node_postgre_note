import user from "../../user/models/user";
import note from "../../note/models/note";
import sequelize from "./db";

export default async (): Promise<void> => {
    const db = sequelize();
    user();
    note();

    await db.sync();
};
