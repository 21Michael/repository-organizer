import React, { useState, useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./signUp.module.scss";
import Form from "../../components/UI/form/form";
import { actions } from "../../storeReduxToolkit/auth/slices";
import { withRouter } from "react-router";
import validator from "validator";
import Notification from "../../components/UI/notification/notification";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import { AppDispatch } from "../../storeReduxToolkit/configStore";
import {
  Props,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/signUp";
import { Notification as NotificationType } from "../../types/storeReduxToolkit/auth/slices";

const SignUp: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();

  const history = props.history;
  const notification: NotificationType = useSelector(
    (state: RootReducer) => state.auth.notification,
    shallowEqual
  );
  const signedUpSuccess: boolean = useSelector(
    (state: RootReducer) => state.auth.signedUpSuccess,
    shallowEqual
  );

  const signedUpSuccessHandler: () => void = useCallback(() => {
    history.push("/signin");
    dispatch(actions.signUpUserFailed());
  }, [dispatch, history]);

  useEffect(() => {
    if (signedUpSuccess) {
      signedUpSuccessHandler();
    }
  }, [signedUpSuccess, signedUpSuccessHandler]);

  const initialState: InitialState = {
    title: `Create an account`,
    inputList: {
      user: {
        element: "input",
        name: "user",
        value: "",
        type: "text",
        label: "User name",
        placeholder: "Surname Name",
        autoComplete: "user-name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      email: {
        element: "input",
        name: "email",
        value: "",
        type: "email",
        label: "Email",
        autoComplete: "email",
        placeholder: "email@gmail.com",
        rules: {
          required: { value: true, message: "required" },
          validate: {
            isEmail: (val: string) =>
              validator.isEmail(val) || "Incorrect email",
          },
        },
      },
      password: {
        element: "input",
        name: "password",
        value: "",
        type: "password",
        label: "Create a password",
        autoComplete: "new-password",
        placeholder: "********",
        inform: "2 uppercase, 3 lowercase, 2 digits, 1 symbol",
        rules: {
          required: { value: true, message: "required" },
          minLength: {
            value: 8,
            message: "Min length should be more than 8 symbols",
          },
          validate: {
            uppercaseLetters: (val: string) =>
              /(?=.*[A-Z].*[A-Z])/.test(val) ||
              "Password doesn't have two uppercase letters",
            specialCaseLetter: (val: string) =>
              /(?=.*[!@#$&*])/.test(val) ||
              "Password doesn't have one special case letter",
            twoDigits: (val: string) =>
              /(?=.*[0-9].*[0-9])/.test(val) ||
              "Password doesn't have two digits",
            threeLowercaseLetters: (val: string) =>
              /(?=.*[a-z].*[a-z].*[a-z])/.test(val) ||
              "Password doesn't have three lowercase letters",
          },
        },
      },
      passwordConfirm: {
        element: "input",
        name: "passwordConfirm",
        value: "",
        type: "password",
        label: "Confirm the password",
        autoComplete: "new-password",
        placeholder: "********",
        rules: {
          required: { value: true, message: "required" },
          validate: {
            samePassword: (val: string) =>
              samePassword(val) || "Different passwords",
          },
        },
      },
    },
    buttonList: {
      signUp: {
        type: "submit",
        label: "Sign Up",
      },
    },
  };

  const [form, setForm] = useState<InitialState>(initialState);

  const onChangeHandler: OnChangeHandler = (value, input) => {
    setForm((state: InitialState) => {
      state.inputList[input].value = value;
      return state;
    });
  };

  const onSubmitHandler: OnSubmitHandler = async (data) => {
    await dispatch(
      actions.signUpUser({
        name: data.user,
        email: data.email,
        password: data.password,
      })
    );
  };

  const samePassword: (password: string) => boolean = (password) => {
    return form.inputList.password.value === password;
  };

  return (
    <div className={classes.wrapper}>
      <Form
        form={form}
        onSubmit={onSubmitHandler}
        onChangeHandler={onChangeHandler}
      />
      {notification ? <Notification notification={notification} /> : null}
    </div>
  );
};

export default withRouter(SignUp);
