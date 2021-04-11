import expressLoader from "./express";
import express from "express";
import Logger from "../logger";
import createTable from "./createTables";

export default async (expressApp: express.Application): Promise<void> => {
    try{
        await createTable();
        await expressLoader({app: expressApp});
    } catch (e) {
        Logger.error(e);
    }
};
