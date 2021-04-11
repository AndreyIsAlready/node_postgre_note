import User from "../models/user";

export default class UserService {
    userModel;

    constructor() {
        this.userModel = User();
    }

    async createUser(username: string, password: string) {
        const newUser = new this.userModel();
        // @ts-ignore
        newUser.username = username;
        // @ts-ignore
        newUser.password = password;

        return await newUser.save();
    }

    async findUser(username: string, password: string) {
        return this.userModel.findOne({where: {username, password}});
    }
}
