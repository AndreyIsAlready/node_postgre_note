import {Router, Request, Response} from "express";

import NoteService from "../../note/services/noteService";
import AuthService from "../../user/services/authService";
import UserService from "../../user/services/userService";

const route = Router();
const noteService = new NoteService();
const authService = new AuthService(UserService);

export default (app: Router): void => {
    app.use("/api", route);

    route.post("/note", async (req: Request, res: Response): Promise<void> => {
        try {
            const {text} = req.body;
            const {token} = req.cookies;
            const user = await authService.verifyToken(token);

            if (!user) {
                res.status(401).json("Unauthorized");
                return;
            }

            const newNote = await noteService.createNote(text, user.id);
            res.status(201).json(newNote);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    route.get("/notes", async (req: Request, res: Response): Promise<void> => {
        try {
            const {token} = req.cookies;
            const user = await authService.verifyToken(token);

            if (!user) {
                res.status(401).json("Unauthorized");
                return;
            }

            const newNote = await noteService.findNotes(user.id);
            res.status(201).json(newNote);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    route.get("/note/:id", async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const {token} = req.cookies;
            let user = {
                id: 0
            };

            if (token) {
                user = await authService.verifyToken(token);
            }

            const note = await noteService.findNote(+id, user.id);

            res.status(201).json(note);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    route.delete("/note/:id", async (req: Request, res: Response): Promise<void> => {
        try {
            const {token} = req.cookies;
            const user = await authService.verifyToken(token);

            if (!user) {
                res.status(401).json("Unauthorized");
                return;
            }

            const { id } = req.params;
            const isDelete = await noteService.deleteNote(+id, user.id);

            res.status(201).json(!!isDelete);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    route.patch("/note", async (req: Request, res: Response): Promise<void> => {
        try {
            const {token} = req.cookies;
            const user = await authService.verifyToken(token);

            if (!user) {
                res.status(401).json("Unauthorized");
                return;
            }

            const { id, text } = req.body;
            const updateNote = await noteService.updateNote(+id, user.id, text);

            res.status(201).json(updateNote);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    route.patch("/share-note", async (req: Request, res: Response): Promise<void> => {
        try {
            const {token} = req.cookies;
            const user = await authService.verifyToken(token);

            if (!user) {
                res.status(401).json("Unauthorized");
                return;
            }

            const { id, isShare } = req.body;

            const updateNote = await noteService.shareNote(+id, user.id, isShare);

            res.status(201).json(updateNote);
        } catch (e) {
            res.status(500).send(e);
        }
    });
};
