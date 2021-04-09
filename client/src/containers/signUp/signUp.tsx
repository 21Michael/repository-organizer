import React, { useState } from "react";
import classes from "./signUp.module.scss";
import Form from "../../components/UI/form/form";
import { withRouter } from "react-router";
import validator from "validator";
import Notification from "../../components/UI/notification/notification";
import {
  Props,
  InitialState,
  OnChangeHandler,
} from "../../types/containers/signUp";
import {useMutation} from "@apollo/client";
import { SIGN_UP_MUTATION } from "./query";

const SignUp: React.FC<Props> = ({ history }) => {
  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: () => {
      history.push("/signin");
    },
    onError: (error) => console.log(error)
  });

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

  const onSubmitHandler: (data: any) => void = async ({ user, email, password }) => {
    await signUp({
      variables: {
        name: user,
        email,
        password
      }
    })
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
      {loading ? <Notification notification={{message: "Loading....", type: 'pending'}} /> : null}
      {error ? <Notification notification={{message: error.message, type: 'error'}} /> : null}
    </div>
  );
};

export default withRouter(SignUp);
