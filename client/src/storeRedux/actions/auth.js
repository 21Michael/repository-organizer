import { ADD_USER, DELETE_USER } from "./actionTypes.js";
import axios from "axios";
import { fetchRepositories, fetchGithubRepositories } from "./repositories.js";

export function signUpUser(user) {
  return () =>
    axios
      .post("/auth/signUp", user)
      .then((res) => {
        if (res.status === 200) {
          console.log("The user was signed up");
        }
      })
      .catch((error) => console.log("Error: " + error));
}

export function signInUser(user) {
  return () =>
    axios
      .post("/auth/signIn", user)
      .then((res) => {
        if (res.status === 200) {
          console.log("The user was signed in");
        }
      })
      .catch((error) => console.log("Error: " + error));
}

export function fetchCurrentUser() {
  return (dispatch) => {
    axios
      .get("/auth/current_user")
      .then((res) => {
        if (res.status === 200) {
          const user = {
            id: res.data.id,
            signedBy: res.data.signed_by,
            name: res.data.user_name,
            email: res.data.email,
            githubId: res.data.github_id,
            avatarURL: res.data.avatar_url,
            profileURL: res.data.profile_url,
          };
          dispatch(addUser(user));

          user.signedBy === "github"
            ? dispatch(fetchGithubRepositories(user))
            : dispatch(fetchRepositories());
        }
      })
      .catch((error) => {
        dispatch(fetchRepositories());
        console.log("Error: " + error);
      });
  };
}

export function signOutUser() {
  return (dispatch) => {
    axios
      .get("/auth/logout")
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(false);
          dispatch(deleteUser());
        }
      })
      .catch((error) => console.log("Error: " + error));
  };
}

export function fetchCurrentUserSuccess(user) {
  return {
    type: ADD_USER,
    user: user,
  };
}

export function signOutUserSuccess() {
  return {
    type: DELETE_USER,
  };
}
