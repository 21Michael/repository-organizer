import types from "./types.js";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  user: {},
  signedIn: false,
  signedUpSuccess: false,
  notification: "",
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FAILED:
      return Immutable.merge(state);
    case types.CURRENT_USER_SUCCESS:
      return Immutable.merge(state, {
        user: Immutable(action.user),
        signedIn: true,
      });
    case types.SHOW_NOTIFICATION:
      return Immutable.merge(state, {
        notification: action.notification,
      });
    case types.HIDE_NOTIFICATION:
      return Immutable.merge(state, {
        notification: "",
      });
    case types.SIGNOUT_USER_SUCCESS:
      return Immutable.merge(state, { signedIn: false });
    case types.SIGNUP_USER_SUCCESS:
      return Immutable.merge(state, {
        signedUpSuccess: true,
      });
    case types.SIGNUP_USER_FAILED:
      return Immutable.merge(state, {
        signedUpSuccess: false,
      });
    default:
      return state;
  }
}
