import types from "./types.js";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  repositories: Immutable([]),
  repositoryEditSuccess: false,
  repositoryAddSuccess: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FAILED:
      return { ...state };
    case types.DELETE_REPO_SUCCESS:
      const repositories = Immutable.getIn(state, ["repositories"]).filter(
        (repo) => repo._id !== action.id
      );
      return Immutable.merge(state, { repositories });
    case types.LOAD_REPOS_SUCCESS:
      return Immutable.merge(state, { repositories: action.repositories });
    case types.EDIT_REPO_SUCCESS:
      return Immutable.merge(state, {
        repositoryEditSuccess: true,
        repositories: state.repositories.map((repository) => {
          if (repository._id === action.id) {
            Object.keys(action.repository).forEach((val) => {
              repository[val] = action.repository[val];
            });
          }
        }),
      });
    case types.EDIT_REPO_FAILED:
      return Immutable.merge(state, {
        repositoryEditSuccess: false,
      });
    case types.ADD_REPO_SUCCESS:
      return Immutable.merge(state, {
        repositoryAddSuccess: true,
        repositories: state.repositories.push(action.repository),
      });
    case types.ADD_REPO_FAILED:
      return Immutable.merge(state, {
        repositoryAddSuccess: false,
      });
    default:
      return state;
  }
}
