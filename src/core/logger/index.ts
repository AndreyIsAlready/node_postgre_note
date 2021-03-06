import logger from "../../config/logger";
import LoggerConstant from "./loggerConstant";
const winston = logger();

export default class Logger {
    static error(error: string): void {
        winston.log({
            message: error,
            label: this.getFixedPathFile(),
            level: LoggerConstant.LOG_LEVEL_ERROR,
        });
    }

    static info(message: string): void {
        winston.log({
            message,
            label: this.getFixedPathFile(),
            level: LoggerConstant.LOG_LEVEL_INFO,
        });
    }

    static debug(message: string): void {
        winston.log({
            message: `###${message}`,
            label: this.getFixedPathFile(),
            level: LoggerConstant.LOG_LEVEL_DEBUG,
        });
    }

    private static getFixedPathFile(): string {
        try {
            throw new Error();
        } catch (e) {
            let path = e.stack.split("at");
            path = e.stack.split("at").length > 6 ? path[4].match(/\((.*)\)/)[1].split(/\\|\//) : path[4].split("/");
            return `${path[path.length - 2]}/${path[path.length - 1]}`.trim();
        }
    }
}
