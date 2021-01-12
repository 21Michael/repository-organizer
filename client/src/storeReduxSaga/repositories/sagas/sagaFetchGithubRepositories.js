import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import TimeValidation from "../../../utiles/time.js";
import axios from "axios";
import actions from "../actions.js";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET_KEY;

function fetchGithubRepositories(user) {
  return axios
    .get(
      `https://api.github.com/users/${user.name}/repos?per_page=5&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )
    .then((res) => res.data);
}

function* sagaProcessFetchGithubRepositories({ user }) {
  try {
    const data = yield call(fetchGithubRepositories, user);

    const repositories = data.map((el) => {
      return {
        _id: el.id,
        name: el.name,
        description: el.description,
        stars: el.stargazers_count,
        creatorName: el.owner.login,
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

function* sagaWatchFetchGithubRepositories() {
  yield takeEvery(types.LOAD_GITHUB_REPOS, sagaProcessFetchGithubRepositories);
}

export default sagaWatchFetchGithubRepositories;
