import types from "../types.js";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import actions from "../actions.js";

function signUpUser(user) {
  return axios.post("/auth/sign-up", user).then((res) => res);
}

function* sagaProcessSignUpUser({ user }) {
  try {
    const response = yield call(signUpUser, user);
    if (response) {
      yield put(actions.signUpUserSuccess());
      yield put(actions.showNotification("User was signed up successfully"));
      yield delay(5000);
      yield put(actions.hideNotification());
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

function* sagaWatchSignUpUser() {
  yield takeEvery(types.SIGNUP_USER, sagaProcessSignUpUser);
}

export default sagaWatchSignUpUser;
