import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import TimeValidation from "../../../utiles/time.js";
import axios from "../../../utiles/axios";
import actions from "../actions.js";

function fetchRepositories() {
  return axios.get("/repositories").then((res) => res.data);
}

function* sagaProcessFetchRepositories() {
  try {
    const data = yield call(fetchRepositories);

    const repositories = data.map((el) => {
      return {
        _id: el.id,
        name: el.name,
        description: el.description,
        stars: el.stars,
        creatorName: el.creator_name,
        createdAt: new TimeValidation().toDateInputValue(el.created_at),
      };
    });

    yield put(actions.fetchRepositoriesSuccess(repositories));
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchFetchRepositories() {
  yield takeEvery(types.LOAD_REPOS, sagaProcessFetchRepositories);
}

export default sagaWatchFetchRepositories;
