import React, { useState } from "react";
import classes from "./signIn.module.scss";
import Form from "../../components/UI/form/form";
import { withRouter } from "react-router-dom";
import validator from "validator";
import Notification from "../../components/UI/notification/notification";
import {
  Props,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/signIn";
import { useMutation } from "@apollo/client";
import { AUTH_LOCAL_MUTATION } from "./query";

const SignIn: React.FC<Props> = ({ history }) => {
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
    },
  };

  const [form, setForm] = useState<InitialState>(initialState);
  const [authLocal, { loading, error }] = useMutation(AUTH_LOCAL_MUTATION, {
    onCompleted: () => {
      history.push("/");
    },
    onError: (error) => console.log(error)
  });

  const onChangeHandler: OnChangeHandler = (value, input) => {
    setForm((state: InitialState) => {
      state.inputList[input].value = value;
      return state;
    });
  };

  const onSubmitHandler: OnSubmitHandler = async (data) => {
    await authLocal({ variables: {
      email: data.email,
      password: data.password,
    }})
  };

  return (
    <div className={classes.wrapper}>
      <Form
        form={form}
        onSubmit={onSubmitHandler}
        onChangeHandler={onChangeHandler}
      />
      {loading ? <Notification notification={{message: "Loading....", type: 'pending'}} /> : null}
      {error ? <Notification notification={{message: error.message, type: 'error'}} /> : null}
    </div>
  );
};

export default withRouter(SignIn);
