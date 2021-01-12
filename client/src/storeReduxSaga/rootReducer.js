import { combineReducers } from "redux";
import authReducer from "./auth";
import notesReducer from "./notes";
import repositoriesReducer from "./repositories";

const rootReducer = combineReducers({
  repositories: repositoriesReducer,
  notes: notesReducer,
  auth: authReducer,
});

export default rootReducer;
