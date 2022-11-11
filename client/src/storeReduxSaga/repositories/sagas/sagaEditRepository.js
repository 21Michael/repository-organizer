import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../../utiles/axios";
import actions from "../actions.js";

function editRepository(id, repo) {
  return axios.put(`/repositories/${id}`, repo).then((res) => res);
}

function* sagaProcessEditRepository({ id, repo }) {
  try {
    const response = yield call(editRepository, id, repo);
    if (response) {
      yield put(actions.editRepositorySuccess(id, repo));
    }
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchEditRepository() {
  yield takeEvery(types.EDIT_REPO, sagaProcessEditRepository);
}

export default sagaWatchEditRepository;
