import {Router, Request, Response} from "express";
import UserService from "../../user/services/userService";
import AuthService from "../../user/services/authService";

const route = Router();
const userService = new UserService();
const authService = new AuthService(UserService);

export default (app: Router): void => {
    app.use("/api/auth", route);

    route.post("/sing-up", async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;
            const newUser = await userService.createUser(username, password);

            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    route.post("/sing-in", async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.body;
            const user = await userService.findUser(username, password);
            const token = authService.getJwt(user);

            res.cookie("token", token, {maxAge: 3600000});
            res.status(200).json(true);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    route.get("/logout", async (req: Request, res: Response): Promise<void> => {
        try {
            res.clearCookie("token");
            res.status(200).json(true);
        } catch (e) {
            res.status(500).send(e);
        }
    });
};
