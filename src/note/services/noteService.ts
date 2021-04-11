import Note from "../models/note";

export default class NoteService {
    noteModel;

    constructor() {
        this.noteModel = Note();
    }

    async createNote(text: string, userId: number) {
        const newNote = new this.noteModel();
        //@ts-ignore
        newNote.text = text;
        //@ts-ignore
        newNote.userId = userId;

        return await newNote.save();
    }

    async findNotes(userId: number) {
        return await this.noteModel.findAll({where: { userId }});
    }

    async findNote(id: number, userId: number) {
        const note = await this.noteModel.findOne({where: { id }});

        //@ts-ignore
        if (note.userId === userId) {
            return note;
        }

        //@ts-ignore
        if (note.shareNote) {
            //@ts-ignore
            return note.text;
        }

        throw("note not available");
    }

    async deleteNote(id: number, userId: number) {
        return await this.noteModel.destroy({where: { id, userId }});
    }

    async updateNote(id: number, userId: number, text: string) {
        const note = await this.noteModel.findOne({where: { id, userId }});

        if (!note) {
            throw("note dont exist");
        }

        //@ts-ignore
        note.text = text;
        return note.save();
    }

    async shareNote(id: number, userId: number, isShare: boolean) {
        const note = await this.noteModel.findOne({where: { id, userId }});

        if (!note) {
            throw("note dont exist");
        }

        //@ts-ignore
        note.shareNote = isShare;
        return note.save();
    }
}
