import typePrefixer from "../../utiles/typePrefixer";

const FETCH_FAILED = "notes/FETCH_FAILED";
const DELETE_NOTE = "notes/DELETE_NOTE";
const DELETE_NOTE_SUCCESS = "notes/DELETE_NOTE_SUCCESS";
const LOAD_NOTES = "notes/LOAD_NOTES";
const LOAD_NOTES_SUCCESS = "notes/LOAD_NOTE_SUCCESS";
const ADD_NOTE = "notes/ADD_NOTE";
const ADD_NOTE_SUCCESS = "notes/ADD_NOTE_SUCCESS";
const ADD_NOTE_FAILED = "notes/ADD_NOTE_FAILED";
const EDIT_NOTE = "notes/EDIT_NOTE";
const EDIT_NOTE_SUCCESS = "notes/EDIT_NOTE_SUCCESS";
const EDIT_NOTE_FAILED = "notes/EDIT_NOTE_FAILED";

const types = typePrefixer({
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  LOAD_NOTES,
  LOAD_NOTES_SUCCESS,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILED,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAILED,
  FETCH_FAILED,
});

export default types;
