import { ThunkApi } from './../../types/storeReduxToolkit/configStore';
import { Note } from './../../types/storeReduxToolkit/notes/slices';
import axios from "../../utiles/axios";
import TimeValidation from "../../utiles/time";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { actions } from "./slices";
import {
  AddNoteProps, AddNoteResponse, NotesResponse, EditNoteProps
} from "../../types/storeReduxToolkit/notes/asyncActions";

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (note: AddNoteProps, thunkApi: ThunkApi) => {
    try {
      const response: AddNoteResponse = await axios.post("/notes", note);
      if (response) {
        const newNoteId: string = response.headers.location.match(/(?<=\/\w+\/).+/g)[0];
        thunkApi.dispatch(
          actions.addNoteSuccess({ id: newNoteId, _id: newNoteId, ...note, })
        );
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string, thunkApi: ThunkApi) => {
    try {
      const response: Response = await axios.delete(`/notes/${id}`);
      if (response) {
        return id;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, text }: EditNoteProps, thunkApi: ThunkApi) => {
    try {
      const response: Response = await axios.put(`/notes/${id}`, { text });
      if (response) {
        thunkApi.dispatch(actions.editNoteSuccess({ id, text }));
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);


export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_arg, thunkApi: ThunkApi) => {
    try {
      const response: { data: NotesResponse } = await axios.get("/notes");
      if (response) {
        const notes: Note[] = response.data.map((el: NotesResponse) => {
          return {
            _id: el.id,
            id: el.id,
            repositoryId: el.repository_id,
            text: el.text,
            createdAt: (TimeValidation as Function)().toDateInputValue(el.created_at),
          };
        });
        return notes;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);
