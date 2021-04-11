import jwt from "jsonwebtoken";

export default class AuthService {
    userService: any;

    constructor(UserService: any) {
        this.userService = new UserService();
    }

    getJwt(user: any): string {
        const payLoad = {
            data: {
                id: user.id,
                username: user.username,
                password: user.password
            }
        };

        return  jwt.sign(
            payLoad,
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
    }

    async verifyToken(token: string): Promise<any> {
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded?.data) {
            return false;
        }
        const { username, password } = decoded.data;
        const user = await this.userService.findUser(username, password);

        return user;
    }
}
