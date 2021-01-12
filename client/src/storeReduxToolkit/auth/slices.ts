import { Notification } from './../../types/storeReduxToolkit/auth/slices';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  signOutUser,
  signInUser,
  signUpUser,
} from "./asyncActions";
import { InitialState, User } from "../../types/storeReduxToolkit/auth/slices";

const initialState: InitialState = {
  user: undefined,
  signedIn: false,
  signedUpSuccess: false,
  notification: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutUserSuccess: (state: InitialState) => {
      state.signedIn = false;
    },
    signUpUserSuccess: (state: InitialState) => {
      state.signedUpSuccess = true;
    },
    signUpUserFailed: (state: InitialState) => {
      state.signedUpSuccess = false;
    },
    showNotification: (state: InitialState, { payload }: PayloadAction<Notification>) => {
      state.notification = payload;
    },
    hideNotification: (state: InitialState) => {
      state.notification = null;
    },
  },
  extraReducers: {
    [fetchCurrentUser.fulfilled.type]: (state: InitialState, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.signedIn = true;
    },
    [signOutUser.fulfilled.type]: (state: InitialState) => {
      state.user = undefined;
      state.signedIn = false;
    },
  },
});

export const actions = {
  ...authSlice.actions,
  fetchCurrentUser,
  signOutUser,
  signInUser,
  signUpUser,
};

export default authSlice.reducer;
