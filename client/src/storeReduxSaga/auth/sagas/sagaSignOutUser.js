import types from "../types.js";
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "../../../utiles/axios";
import actions from "../actions.js";

function signOutUser() {
  return axios.get("/auth/sign-out").then((res) => res);
}

function* sagaProcessSignOutUser() {
  try {
    const response = yield call(signOutUser);
    if (response) {
      yield put(actions.signOutUserSuccess());
      yield put(actions.fetchCurrentUser());
    }
  } catch (error) {
    yield put({
      type: types.FETCH_FAILED,
      error,
    });
  }
}

function* sagaWatchSignOutUser() {
  yield takeEvery(types.SIGNOUT_USER, sagaProcessSignOutUser);
}

export default sagaWatchSignOutUser;
