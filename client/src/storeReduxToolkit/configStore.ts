import { logger } from 'redux-logger';
import rootReducer, { RootState } from "./rootReducer";
import { configureStore, MiddlewareArray, Action } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(thunk, logger),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
