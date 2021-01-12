import { DELETE_NOTE, ADD_NOTES } from "../actions/actionTypes.js";

const initialState = {
  notes: [],
};

export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_NOTE:
      state.notes = state.notes.filter((note) => note._id !== action.id);
      return { ...state };
    case ADD_NOTES:
      state.notes = action.notes;
      return { ...state };
    default:
      return state;
  }
}
