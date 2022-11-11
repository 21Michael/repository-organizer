import { DELETE_REPO, ADD_REPOS } from "./actionTypes.js";
import axios from "../../utiles/axios";
import TimeValidation from "../../utiles/time.js";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET_KEY;

export function fetchRepositories() {
  return (dispatch) => {
    axios
      .get("/repositories")
      .then((res) => {
        if (res.status === 200) {
          const repositories = res.data.map((el) => {
            return {
              _id: el.id,
              name: el.name,
              description: el.description,
              stars: el.stars,
              creator_name: el.creator_name,
              created_at: new TimeValidation().toDateInputValue(el.created_at),
            };
          });
          dispatch(addRepositories(repositories));
        }
      })
      .catch((error) => console.log("Error: " + error));
  };
}

export function fetchGithubRepositories(user) {
  return (dispatch) => {
    axios
      .get(
        `https://api.github.com/users/${user.name}/repos?per_page=5&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
      )
      .then((res) => {
        if (res.status === 200) {
          const repositories = res.data.map((el) => {
            return {
              _id: el.id,
              name: el.name,
              description: el.description,
              stars: el.stargazers_count,
              creator_name: el.owner.login,
              created_at: new TimeValidation().toDateInputValue(el.created_at),
            };
          });
          dispatch(addRepositories(repositories));
        }
      })
      .catch((error) => console.log("Error: " + error));
  };
}

export function addRepository(repository, callback) {
  return () =>
    axios
      .post("/repositories/add", repository)
      .then((res) => {
        if (res.status === 200) {
          console.log("The repository was added");
          callback();
        }
      })
      .catch((error) => console.log("Error: " + error));
}

export function deleteRepository(id) {
  return (dispatch) => {
    axios
      .delete(`/repositories/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteRepository(id));
          console.log("The repository was deleted");
        }
      })
      .catch((error) => console.log("Error: " + error));
  };
}

export function editRepository(id, repo, callback) {
  return () =>
    axios
      .put(`/repositories/edit/${id}`, repo)
      .then((res) => {
        if (res.status === 200) {
          console.log("The repository was edited");
          callback();
        }
      })
      .catch((error) => console.log("Error: " + error));
}

export function fetchRepositoriesSuccess(repositories) {
  return {
    type: ADD_REPOS,
    repositories: repositories,
  };
}

export function deleteRepositorySuccess(id) {
  return {
    type: DELETE_REPO,
    id: id,
  };
}
