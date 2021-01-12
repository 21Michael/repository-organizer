import sagaWatchFetchRepositories from "./sagaFetchRepositories.js";
import sagaWatchAddRepository from "./sagaAddRepository.js";
import sagaWatchDeleteRepository from "./sagaDeleteRepository.js";
import sagaWatchFetchGithubRepositories from "./sagaFetchGithubRepositories.js";
import sagaWatchEditRepository from "./sagaEditRepository.js";

const sagas = [
  sagaWatchFetchRepositories(),
  sagaWatchAddRepository(),
  sagaWatchDeleteRepository(),
  sagaWatchFetchGithubRepositories(),
  sagaWatchEditRepository(),
];

export default sagas;
