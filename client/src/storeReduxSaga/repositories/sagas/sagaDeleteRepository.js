import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../../utiles/axios";
import actions from "../actions.js";

function deleteRepository(id) {
  return axios.delete(`/repositories/${id}`);
}

function* sagaProcessDeleteRepository({ id }) {
  try {
    yield call(deleteRepository, id);
    yield put(actions.deleteRepositorySuccess(id));
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchDeleteRepository() {
  yield takeEvery(types.DELETE_REPO, sagaProcessDeleteRepository);
}

export default sagaWatchDeleteRepository;
