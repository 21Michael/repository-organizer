import { all } from "redux-saga/effects";
import { sagas as authSagas } from "./auth/index";
import { sagas as noteSagas } from "./notes/index.js";
import { sagas as repositorySagas } from "./repositories/index.js";

const allSagas = [...authSagas, ...noteSagas, ...repositorySagas];

export default function* rootSaga() {
  yield all(allSagas);
}
