import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../../utiles/axios";
import actions from "../actions.js";

function addRepository(repository) {
  return axios.post("/repositories", repository).then((res) => res);
}

function* sagaProcessAddRepository({ repository }) {
  try {
    const response = yield call(addRepository, repository);
    if (response) {
      const newRepositoryId = response.headers.location.match(/(?<=\/\w+\/).+/g)[0];
      yield put(actions.addRepositorySuccess({ _id: newRepositoryId, ...repository }));
    }
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchAddRepository() {
  yield takeEvery(types.ADD_REPO, sagaProcessAddRepository);
}

export default sagaWatchAddRepository;
