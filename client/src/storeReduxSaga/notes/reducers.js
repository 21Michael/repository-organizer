import types from "./types.js";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  notes: Immutable([]),
  noteAddSuccess: false,
  noteEditSuccess: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FAILED:
      return { ...state };
    case types.DELETE_NOTE_SUCCESS:
      const notes = Immutable.getIn(state, ["notes"]).filter(
        (note) => note._id !== action.id
      );
      return Immutable.merge(state, { notes });
    case types.LOAD_NOTES_SUCCESS:
      return Immutable.merge(state, { notes: Immutable(action.notes) });

    case types.EDIT_NOTE_SUCCESS:
      return Immutable.merge(state, {
        noteEditSuccess: true,
        notes: state.notes.map((note) => {
          if (note._id === action.id) {
            note.text = action.text;
          }
        }),
      });
    case types.EDIT_NOTE_FAILED:
      return Immutable.merge(state, {
        noteEditSuccess: false,
      });
    case types.ADD_NOTE_SUCCESS:
      return Immutable.merge(state, {
        noteAddSuccess: true,
        notes: state.notes.push(action.note),
      });
    case types.ADD_NOTE_FAILED:
      return Immutable.merge(state, {
        noteAddSuccess: false,
      });
    default:
      return state;
  }
}
