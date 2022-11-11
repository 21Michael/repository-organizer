import { DELETE_NOTE, ADD_NOTES } from "./actionTypes.js";
import axios from "../../utiles/axios";
import TimeValidation from "../../utiles/time.js";

export function fetchNotes() {
  return (dispatch) => {
    axios
      .get("/notes")
      .then((res) => {
        if (res.status === 200) {
          const notes = res.data.map((el) => {
            return {
              _id: el.id,
              id: el.id,
              repository_id: el.repository_id,
              text: el.text,
              created_at: new TimeValidation().toDateInputValue(el.created_at),
            };
          });
          dispatch(addNotes(notes));
        }
      })
      .catch((error) => console.log("Error: " + error));
  };
}

export function addNote(note, callback) {
  return () =>
    axios
      .post("/notes/add", note)
      .then((res) => {
        if (res.status === 200) {
          console.log("The note was added");
          callback();
        }
      })
      .catch((error) => console.log("Error: " + error));
}

export function deleteNote(id) {
  return (dispatch) => {
    axios
      .delete(`/notes/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteNote(id));
          console.log("The note was deleted");
        }
      })
      .catch((error) => console.log("Error: " + error));
  };
}

export function editNote(id, note, callback) {
  return () =>
    axios
      .put(`/notes/edit/${id}`, note)
      .then((res) => {
        if (res.status === 200) {
          console.log("The note was edited");
          callback();
        }
      })
      .catch((error) => console.log("Error: " + error));
}

export function fetchNotesSuccess(notes) {
  return {
    type: ADD_NOTES,
    notes: notes,
  };
}

export function deleteNoteSuccess(id) {
  return {
    type: DELETE_NOTE,
    id: id,
  };
}
