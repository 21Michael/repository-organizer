import typePrefixer from "../../utiles/typePrefixer";

const FETCH_FAILED = "repositories/FETCH_FAILED";
const DELETE_REPO = "repositories/DELETE_REPO";
const DELETE_REPO_SUCCESS = "repositories/DELETE_REPO_SUCCESS";
const LOAD_REPOS = "repositories/LOAD_REPOSITORIES";
const LOAD_GITHUB_REPOS = "repositories/LOAD_GITHUB_REPOS";
const LOAD_REPOS_SUCCESS = "repositories/LOAD_REPOS_SUCCESS";
const ADD_REPO = "repositories/ADD_REPO";
const ADD_REPO_SUCCESS = "repositories/ADD_REPO_SUCCESS";
const ADD_REPO_FAILED = "repositories/ADD_REPO_FAILED";
const EDIT_REPO = "repositories/EDIT_REPO";
const EDIT_REPO_SUCCESS = "repositories/EDIT_REPO_SUCCESS";
const EDIT_REPO_FAILED = "repositories/EDIT_REPO_FAILED";

const types = typePrefixer({
  FETCH_FAILED,
  DELETE_REPO,
  DELETE_REPO_SUCCESS,
  LOAD_REPOS,
  LOAD_GITHUB_REPOS,
  LOAD_REPOS_SUCCESS,
  ADD_REPO,
  ADD_REPO_SUCCESS,
  ADD_REPO_FAILED,
  EDIT_REPO,
  EDIT_REPO_SUCCESS,
  EDIT_REPO_FAILED,
});

export default types;
