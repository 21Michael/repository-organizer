import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import actions from "../actions.js";

function deleteNote(id) {
  return axios.delete(`/notes/${id}`);
}

function* sagaProcessDeleteNote({ id }) {
  try {
    yield call(deleteNote, id);
    yield put(actions.deleteNoteSuccess(id));
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchDeleteNote() {
  yield takeEvery(types.DELETE_NOTE, sagaProcessDeleteNote);
}

export default sagaWatchDeleteNote;
