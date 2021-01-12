import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRepositories,
  fetchGithubRepositories,
  editRepository,
  deleteRepository,
  addRepository,
} from "./asyncActions";
import { InitialState, Repository } from "../../types/storeReduxToolkit/repositories/slices";

const initialState: InitialState = {
  repositories: [],
  repositoryEditSuccess: false,
  repositoryAddSuccess: false,
};

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    addRepositorySuccess: (state: InitialState, { payload }: PayloadAction<Repository>) => {
      state.repositoryAddSuccess = true;
      state.repositories.push(payload);
    },
    addRepositoryFailed: (state: InitialState) => {
      state.repositoryAddSuccess = false;
    },
    editRepositorySuccess: (
      state: InitialState,
      { payload }: PayloadAction<{ id: string; repository: Repository }>
    ) => {
      state.repositoryEditSuccess = true;
      state.repositories.map((repository) => {
        if (repository._id === payload.id) {
          Object.keys(payload.repository)
            .forEach((val) => {
              repository[val] = payload.repository[val];
            });
        }
        return repository;
      });
    },
    editRepositoryFailed: (state: InitialState) => {
      state.repositoryEditSuccess = false;
    },
  },
  extraReducers: {
    [deleteRepository.fulfilled.type]: (
      state: InitialState,
      { payload }: PayloadAction<string>
    ) => {
      state.repositories = state.repositories.filter(
        (repo) => repo._id !== payload
      );
    },
    [fetchRepositories.fulfilled.type]: (
      state: InitialState,
      { payload }: PayloadAction<Repository[]>
    ) => {
      state.repositories = payload;
    },
    [fetchGithubRepositories.fulfilled.type]: (
      state: InitialState,
      { payload }: PayloadAction<Repository[]>
    ) => {
      state.repositories = payload;
    },
  },
});

export const actions = {
  ...repositoriesSlice.actions,
  fetchRepositories,
  fetchGithubRepositories,
  editRepository,
  deleteRepository,
  addRepository,
};

export default repositoriesSlice.reducer;
