import dotenv from "dotenv";
dotenv.config();

import AuthService from "../../../src/user/services/authService";
import UserServiceMock from "../mock/UserServiceMock";

const authService = new AuthService(UserServiceMock);

test("authService test", async () => {
    const user = {
        id: 1,
        username: "username",
        password: "password",
    };

    const token = authService.getJwt(user);

    expect(typeof token).toEqual("string");

    const expectUser = await authService.verifyToken(token);

    expect(expectUser).toEqual(user);
});
