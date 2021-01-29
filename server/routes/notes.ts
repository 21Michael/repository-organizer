import { NoteModel as NoteModelPostgres } from './../types/databases/models/postgres/note';
import { NoteModel as NoteModelMongo } from './../types/databases/models/mongo/note';
import createRouter, { Response } from "express";
import authentication from "../middlewares/authentication";
import sanitize from "../middlewares/sanitize";
import db from "../services/index";
import { RequestInterface } from '../types/routes/notes'
import { checkCsrfMiddleware } from '../middlewares/csrf';

const router = createRouter.Router();
const Note = db.Note;

const getAllNotes = async (req: RequestInterface, res: Response) => {
  try {
    const id: string = req.user.id;
    const notes: NoteModelPostgres[] | NoteModelMongo[] = await Note.findAll({ id });
    if (notes) {
      res.json(notes);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

export const addNote = async (req: RequestInterface, res: Response) => {
  try {
    const { repositoryId, text, createdAt } = req.body;
    const newNote: NoteModelPostgres | NoteModelMongo = await Note.createNote({
      repositoryId,
      text,
      createdAt,
      userId: req.user.id
    });
    const newNoteId = newNote.id;
    res.setHeader("Location", `${req.baseUrl}/${newNoteId}`);
    res.status(201).send("Note added!");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteNote = async (req: RequestInterface, res: Response) => {
  try {
    await Note.deleteOne({ userId: req.user.id, noteId: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const editNote = async (req: RequestInterface, res: Response) => {
  try {
    const { text } = req.body;
    await Note.updateOne({ text, userId: req.user.id, noteId: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(404).send(err.message);
  }
}

router.get("/", checkCsrfMiddleware, authentication, getAllNotes);
router.post("/", checkCsrfMiddleware, authentication, sanitize, addNote);
router.delete("/:id", checkCsrfMiddleware, authentication, sanitize, deleteNote);
router.put("/:id", checkCsrfMiddleware, authentication, sanitize, editNote);

export default router;
