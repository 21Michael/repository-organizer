import types from "../types.js";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import actions from "../actions.js";

function signInUser(user) {
  return axios.post("/auth/sign-in", user).then((res) => res);
}

function* sagaProcessSignInUser({ user }) {
  try {
    const response = yield call(signInUser, user);
    if (response) {
      yield put(actions.fetchCurrentUser());
    }
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
    yield put(actions.showNotification(error.message));
    yield delay(5000);
    yield put(actions.hideNotification());
  }
}

function* sagaWatchSignInUser() {
  yield takeEvery(types.SIGNIN_USER, sagaProcessSignInUser);
}

export default sagaWatchSignInUser;
