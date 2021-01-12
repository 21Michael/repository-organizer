import { DELETE_REPO, ADD_REPOS } from "../actions/actionTypes.js";

const initialState = {
  repositories: [],
};
export default function repositoriesReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_REPO:
      state.repositories = state.repositories.filter(
        (repo) => repo._id !== action.id
      );
      return { ...state };
    case ADD_REPOS:
      state.repositories = action.repositories;
      return { ...state };
    default:
      return state;
  }
}
