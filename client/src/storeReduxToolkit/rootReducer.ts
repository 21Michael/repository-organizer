import { combineReducers, Reducer } from "redux";
import authReducer from "./auth/slices";
import notesReducer from "./notes/slices";
import repositoriesReducer from "./repositories/slices";
import { RootReducer } from '../types/storeReduxToolkit/rootReducer'
import setCSRFToken from '../config/setCSRFToken';

setCSRFToken();

const rootReducer: Reducer<RootReducer> = combineReducers({
  repositories: repositoriesReducer,
  notes: notesReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
