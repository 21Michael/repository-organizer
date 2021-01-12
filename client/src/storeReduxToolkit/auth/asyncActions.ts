import { ThunkApi } from './../../types/storeReduxToolkit/configStore';
import { User } from './../../types/storeReduxToolkit/auth/slices';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { actions } from "./slices";
import { actions as actionsRepositories } from "../repositories/slices";
import { actions as actionsNotes } from "../notes/slices";
import {
  UserProps, CurrentUserResponse, CustomResponse
} from "../../types/storeReduxToolkit/auth/asyncActions";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (user: UserProps, thunkApi: ThunkApi) => {
    try {
      const response: CustomResponse = await axios.post("/auth/sign-up", user);
      if (response) {
        thunkApi.dispatch(actions.signUpUserSuccess());
        thunkApi.dispatch(actions.showNotification({ message: response?.data, type: 'success' }));
        setTimeout(() => {
          thunkApi.dispatch(actions.hideNotification());
        }, 5000);
      }
    } catch (error) {
      const errorMessage = error.response.data;
      thunkApi.dispatch(actions.showNotification({ message: errorMessage, type: 'error' }));
      setTimeout(() => {
        thunkApi.dispatch(actions.hideNotification());
      }, 5000);
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (user: UserProps, thunkApi: ThunkApi) => {
    try {
      const response: Response = await axios.post("/auth/sign-in", user);
      if (response) {
        thunkApi.dispatch(actions.fetchCurrentUser());
      }
    } catch (error) {
      const errorMessage = error.response.data;
      thunkApi.dispatch(actions.showNotification({ message: errorMessage, type: 'error' }));
      setTimeout(() => {
        thunkApi.dispatch(actions.hideNotification());
      }, 5000);
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_arg, thunkApi: ThunkApi) => {
    try {
      const response: { data: CurrentUserResponse } = await axios.get("/auth/current-user");
      const userResponse: CurrentUserResponse = response.data;
      if (response) {
        const user: User = {
          id: userResponse.id,
          signedBy: userResponse.signed_by,
          name: userResponse.user_name,
          email: userResponse.email,
          githubId: userResponse.github_id,
          avatarURL: userResponse.avatar_url,
          profileURL: userResponse.profile_url,
        };
        user.signedBy === "github"
          ? thunkApi.dispatch(actionsRepositories.fetchGithubRepositories(user))
          : thunkApi.dispatch(actionsRepositories.fetchRepositories());
        thunkApi.dispatch(actionsNotes.fetchNotes());

        return user;
      }
    } catch (error) {
      thunkApi.dispatch(actionsRepositories.fetchRepositories());
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);

export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_arg, thunkApi: ThunkApi) => {
    try {
      const response: Response = await axios.get("/auth/sign-out");
      if (response) {
        thunkApi.dispatch(actions.signOutUserSuccess());
        thunkApi.dispatch(actions.fetchCurrentUser());
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as Error);
    }
  }
);
