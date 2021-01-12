import types from "./types.js";

function fetchNotes() {
  return { type: types.LOAD_NOTES };
}

function addNote(note) {
  return { type: types.ADD_NOTE, note };
}

function addNoteSuccess(note) {
  return { type: types.ADD_NOTE_SUCCESS, note };
}

function addNoteFailed() {
  return { type: types.ADD_NOTE_FAILED };
}

function deleteNote(id) {
  return { type: types.DELETE_NOTE, id };
}

function editNote(id, text) {
  return { type: types.EDIT_NOTE, id, text };
}

function editNoteSuccess(id, text) {
  return { type: types.EDIT_NOTE_SUCCESS, id, text };
}

function editNoteFailed() {
  return { type: types.EDIT_NOTE_FAILED };
}

function fetchNotesSuccess(notes) {
  return {
    type: types.LOAD_NOTES_SUCCESS,
    notes: notes,
  };
}

function deleteNoteSuccess(id) {
  return {
    type: types.DELETE_NOTE_SUCCESS,
    id: id,
  };
}

const actions = {
  fetchNotes,
  addNote,
  addNoteSuccess,
  addNoteFailed,
  deleteNote,
  editNote,
  editNoteSuccess,
  editNoteFailed,
  fetchNotesSuccess,
  deleteNoteSuccess,
};

export default actions;
