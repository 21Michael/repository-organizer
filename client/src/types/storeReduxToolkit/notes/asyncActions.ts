import { Note } from "./slices";

export interface AddNoteProps {
  repositoryId: string;
  text: string;
  createdAt: string;
  [key: string]: string;
}

export interface AddNoteResponse {
  headers: {
    location: {
      match(RegExp: RegExp): string
    }
  }
}

export interface EditNoteProps {
  id: string,
  text: string,
  [key: string]: string;
}

export interface NotesResponse {
  id: string;
  repository_id: string;
  text: string;
  created_at: Date
  map: (el: Object) => Note[]
}
