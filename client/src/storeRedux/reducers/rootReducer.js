import { combineReducers } from "redux";
import repositoriesReducer from "./repositories.js";
import notesReducer from "./notes.js";
import authReducer from "./auth.js";

export default combineReducers({
  repositories: repositoriesReducer,
  notes: notesReducer,
  auth: authReducer,
});
