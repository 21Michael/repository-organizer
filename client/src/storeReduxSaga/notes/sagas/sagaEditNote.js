import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../../utiles/axios";
import actions from "../actions";

function editNote(id, text) {
  return axios.put(`/notes/${id}`, { text }).then((res) => res);
}

function* sagaProcessEditNote({ id, text }) {
  try {
    const response = yield call(editNote, id, text);
    if (response) {
      yield put(actions.editNoteSuccess(id, text));
    }
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchEditNote() {
  yield takeEvery(types.EDIT_NOTE, sagaProcessEditNote);
}

export default sagaWatchEditNote;
