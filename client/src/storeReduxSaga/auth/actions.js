import types from "./types.js";

function signUpUser(user) {
  return { type: types.SIGNUP_USER, user };
}
function signUpUserSuccess() {
  return { type: types.SIGNUP_USER_SUCCESS };
}
function signUpUserFailed() {
  return { type: types.SIGNUP_USER_FAILED };
}
function showNotification(notification) {
  return {
    type: types.SHOW_NOTIFICATION,
    notification,
  };
}

function hideNotification() {
  return {
    type: types.HIDE_NOTIFICATION,
  };
}
function signInUser(user) {
  return { type: types.SIGNIN_USER, user };
}

function fetchCurrentUser() {
  return { type: types.CURRENT_USER };
}

function signOutUser() {
  return { type: types.SIGNOUT_USER };
}

function fetchCurrentUserSuccess(user) {
  return {
    type: types.CURRENT_USER_SUCCESS,
    user,
  };
}

function signOutUserSuccess() {
  return {
    type: types.SIGNOUT_USER_SUCCESS,
  };
}

const actions = {
  signUpUser,
  signUpUserSuccess,
  signUpUserFailed,
  signInUser,
  fetchCurrentUser,
  signOutUser,
  fetchCurrentUserSuccess,
  signOutUserSuccess,
  showNotification,
  hideNotification,
};

export default actions;
