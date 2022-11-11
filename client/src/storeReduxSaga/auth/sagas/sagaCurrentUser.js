import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../../utiles/axios";
import actions from "../actions";
import actionsRepositories from "../../repositories/actions";

function fetchCurrentUser() {
  return axios.get("/auth/current-user").then((res) => res.data);
}

function* sagaProcessCurrentUser() {
  try {
    const data = yield call(fetchCurrentUser);
    const user = {
      id: data.id,
      signedBy: data.signed_by,
      name: data.user_name,
      email: data.email,
      githubId: data.github_id,
      avatarURL: data.avatar_url,
      profileURL: data.profile_url,
    };
    yield put(actions.fetchCurrentUserSuccess(user));

    user?.signedBy === "github"
      ? yield put(actionsRepositories.fetchGithubRepositories(user))
      : yield put(actionsRepositories.fetchRepositories());
  } catch (error) {
    yield put(actionsRepositories.fetchRepositories());
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchCurrentUser() {
  yield takeEvery(types.CURRENT_USER, sagaProcessCurrentUser);
}

export default sagaWatchCurrentUser;
