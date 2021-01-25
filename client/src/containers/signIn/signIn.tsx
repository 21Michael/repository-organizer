import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./signIn.module.scss";
import Form from "../../components/UI/form/form";
import { withRouter } from "react-router-dom";
import validator from "validator";
import { actions } from "../../storeReduxToolkit/auth/slices";
import Notification from "../../components/UI/notification/notification";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import { AppDispatch } from "../../storeReduxToolkit/configStore";
import {
  Props,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/signIn";
import { Notification as NotificationType } from "../../types/storeReduxToolkit/auth/slices";

const SignIn: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();

  const history = props.history;
  const notification: NotificationType = useSelector(
    (state: RootReducer) => state.auth.notification,
    shallowEqual
  );

  const signedIn: boolean = useSelector(
    (state: RootReducer) => state.auth.signedIn,
    shallowEqual
  );

  useEffect(() => {
    if (signedIn) {
      history.push("/");
    }
  }, [history, signedIn]);

  const initialState: InitialState = {
    title: `Authorization`,
    inputList: {
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
        label: "Password",
        autoComplete: "current-password",
        placeholder: "********",
        rules: {
          required: { value: true, message: "required" },
          minLength: {
            value: 8,
            message: "Min length should be more than 8 symbols",
          },
        },
      },
    },
    buttonList: {
      signIn: {
        type: "submit",
        label: "Sign In",
      },
      signUp: {
        type: "link",
        label: "Sign Up",
        to: "signup",
        classModifier: "signup",
      },
      github: {
        type: "network",
        name: "github",
        icon: "github",
        to: `${process.env.REACT_APP_SERVER_URL}/auth/github`,
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
      actions.signInUser({
        email: data.email,
        password: data.password,
      })
    );
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

export default withRouter(SignIn);
