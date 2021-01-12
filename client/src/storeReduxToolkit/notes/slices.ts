import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNote, deleteNote, editNote, fetchNotes } from "./asyncActions";
import { InitialState, Note } from "../../types/storeReduxToolkit/notes/slices";

const initialState: InitialState = {
  notes: [],
  noteAddSuccess: false,
  noteEditSuccess: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNoteSuccess: (state: InitialState, { payload }: PayloadAction<Note>) => {
      state.noteAddSuccess = true;
      state.notes.push(payload);
    },
    addNoteFailed: (state: InitialState) => {
      state.noteAddSuccess = false;
    },
    editNoteSuccess: (
      state: InitialState,
      { payload }: PayloadAction<{ id: string; text: string }>
    ) => {
      state.noteEditSuccess = true;
      state.notes.map((note) => {
        if (note._id === payload.id) {
          note.text = payload.text;
        }
        return note;
      });
    },
    editNoteFailed: (state: InitialState) => {
      state.noteEditSuccess = false;
    },
  },
  extraReducers: {
    [deleteNote.fulfilled.type]: (
      state: InitialState,
      { payload }: PayloadAction<string>
    ) => {
      state.notes = state.notes.filter((note) => note._id !== payload);
    },
    [fetchNotes.fulfilled.type]: (
      state: InitialState,
      { payload }: PayloadAction<Note[]>
    ) => {
      state.notes = payload;
    },
  },
});

export const actions = {
  ...notesSlice.actions,
  addNote,
  deleteNote,
  editNote,
  fetchNotes,
};

export default notesSlice.reducer;
