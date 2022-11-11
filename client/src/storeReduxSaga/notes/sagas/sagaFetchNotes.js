import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import TimeValidation from "../../../utiles/time.js";
import axios from "../../../utiles/axios";
import actions from "../actions.js";

function fetchNotes() {
  return axios.get("/notes").then((res) => res.data);
}

function* sagaProcessFetchNotes() {
  try {
    const data = yield call(fetchNotes);
    console.log(data);
    const notes = data.map((el) => {
      return {
        _id: el.id,
        id: el.id,
        repositoryId: el.repository_id,
        text: el.text,
        createdAt: new TimeValidation().toDateInputValue(el.created_at),
      };
    });

    yield put(actions.fetchNotesSuccess(notes));
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchFetchNotes() {
  yield takeEvery(types.LOAD_NOTES, sagaProcessFetchNotes);
}

export default sagaWatchFetchNotes;
