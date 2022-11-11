import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../../utiles/axios";
import actions from "../actions.js";

function addNote(note) {
  return axios.post("/notes", note).then((res) => res);
}

function* sagaProcessAddNote({ note }) {
  try {
    const response = yield call(addNote, note);
    if (response) {
      const newNoteId = response.headers.location.match(/(?<=\/\w+\/).+/g)[0];
      yield put(
        actions.addNoteSuccess({ _id: newNoteId, id: newNoteId, ...note })
      );
    }
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchAddNote() {
  yield takeEvery(types.ADD_NOTE, sagaProcessAddNote);
}

export default sagaWatchAddNote;
