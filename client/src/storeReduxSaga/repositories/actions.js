import types from "./types.js";

function fetchRepositories() {
  return { type: types.LOAD_REPOS };
}

function fetchGithubRepositories(user) {
  return { type: types.LOAD_GITHUB_REPOS, user: user };
}

function addRepository(repository) {
  return { type: types.ADD_REPO, repository };
}

function addRepositorySuccess(repository) {
  return { type: types.ADD_REPO_SUCCESS, repository };
}

function addRepositoryFailed() {
  return { type: types.ADD_REPO_FAILED };
}

function deleteRepository(id) {
  return { type: types.DELETE_REPO, id };
}

function editRepository(id, repo) {
  return { type: types.EDIT_REPO, id, repo };
}

function editRepositorySuccess(id, repository) {
  return { type: types.EDIT_REPO_SUCCESS, id, repository };
}

function editRepositoryFailed() {
  return { type: types.EDIT_REPO_FAILED };
}

function fetchRepositoriesSuccess(repositories) {
  return {
    type: types.LOAD_REPOS_SUCCESS,
    repositories,
  };
}

function deleteRepositorySuccess(id) {
  return {
    type: types.DELETE_REPO_SUCCESS,
    id,
  };
}
const actions = {
  fetchRepositories,
  fetchGithubRepositories,
  addRepository,
  addRepositorySuccess,
  addRepositoryFailed,
  deleteRepository,
  editRepository,
  editRepositorySuccess,
  editRepositoryFailed,
  fetchRepositoriesSuccess,
  deleteRepositorySuccess,
};

export default actions;
