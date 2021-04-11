export default class UserServiceMock {
    async createUser(username: string, password: string) {
        return {
            id: 1,
            username,
            password,
        };
    }

    async findUser(username: string, password: string) {
        return {
            id: 1,
            username,
            password,
        };
    }
}