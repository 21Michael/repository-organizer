import { ADD_USER, DELETE_USER } from "../actions/actionTypes.js";

const initialState = {};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      state.user = action.user;
      return { ...state };
    case DELETE_USER:
      delete state.user;
      return { ...state };
    default:
      return state;
  }
}
