import { RepositoryGitHubResponse } from './../../types/storeReduxToolkit/repositories/asyncActions';
import { ThunkApi } from './../../types/storeReduxToolkit/configStore';
import { Repository } from './../../types/storeReduxToolkit/repositories/slices';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import TimeValidation from "../../utiles/time";
import { actions } from "./slices";
import {
  AddRepositoryProps, AddRepositoryResponse, RepositoryGitHub, RepositoryLocal, EditRepositoryProps
} from "../../types/storeReduxToolkit/repositories/asyncActions";
import { User } from '../../types/storeReduxToolkit/auth/slices'

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET_KEY;

export const addRepository = createAsyncThunk(
  "repositories/addRepository",
  async (repository: AddRepositoryProps, thunkApi: ThunkApi) => {
    try {
      const response: AddRepositoryResponse = await axios.post("/repositories", repository);
      if (response) {
        repository._id = response.headers.location.match(
          /(?<=\/\w+\/).+/g
        )[0];
        thunkApi.dispatch(
          actions.addRepositorySuccess(repository)
        );
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const deleteRepository = createAsyncThunk(
  "repositories/deleteRepository",
  async (id: string, thunkApi: ThunkApi) => {
    try {
      const response: Response = await axios.delete(`/repositories/${id}`);
      if (response) {
        return id;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const editRepository = createAsyncThunk(
  "repositories/editRepository",
  async ({ id, repo }: EditRepositoryProps, thunkApi: ThunkApi) => {
    try {
      const response: Response = await axios.put(`/repositories/${id}`, repo);

      if (response) {
        thunkApi.dispatch(actions.editRepositorySuccess({ id, repository: repo }));
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const fetchGithubRepositories = createAsyncThunk(
  "repositories/fetchGithubRepositories",
  async (user: User, thunkApi: ThunkApi) => {
    try {
      const response: RepositoryGitHubResponse = await axios.get(
        `https://api.github.com/users/${user.name}/repos?per_page=5&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
      );
      if (response) {
        const repositories: Repository[] = response.data.map((el: RepositoryGitHub) => {
          return {
            _id: String(el.id),
            name: el.name,
            description: el.description,
            stars: el.stargazers_count,
            creatorName: el.owner.login,
            createdAt: (TimeValidation as Function)().toDateInputValue(el.created_at),
          };
        });
        return repositories;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const fetchRepositories = createAsyncThunk(
  "repositories/fetchRepositories",
  async (_arg, thunkApi: ThunkApi) => {
    try {
      const response = await axios.get("/repositories");
      if (response) {
        const repositories = response.data.map((el: RepositoryLocal) => {
          return {
            _id: el.id,
            name: el.name,
            description: el.description,
            stars: el.stars,
            creatorName: el.creator_name,
            createdAt: (TimeValidation as Function)().toDateInputValue(el.created_at),
          };
        });
        return repositories;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);
