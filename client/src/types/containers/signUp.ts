import { RouteComponentProps } from "react-router";

export interface Props extends RouteComponentProps { }
interface Input {
  element: string;
  name: string;
  value: string;
  type: string;
  label: string;
  autoComplete: string;
  placeholder: string;
  rules?: {
    required: { value: boolean; message: string };
  };
}
interface UserInput extends Input { }
interface EmailInput extends Input {
  rules?: {
    required: { value: boolean; message: string };
    validate: {
      isEmail: (value: string) => boolean | "Incorrect email";
    };
  };
}
interface PasswordInput extends Input {
  inform: string;
  rules?: {
    required: { value: boolean; message: string };
    minLength: {
      value: number;
      message: string;
    };
    validate: {
      uppercaseLetters: (
        value: string
      ) => boolean | "Password doesn't have two uppercase letters";
      specialCaseLetter: (
        value: string
      ) => boolean | "Password doesn't have one special case letter";
      twoDigits: (
        value: string
      ) => boolean | "Password doesn't have two digits";
      threeLowercaseLetters: (
        value: string
      ) => boolean | "Password doesn't have three lowercase letters";
    };
  };
}
interface PasswordConfirm extends Input {
  rules?: {
    required: { value: boolean; message: string };
    validate: {
      samePassword: (value: string) => boolean | "Different passwords";
    };
  };
}

export type OnSubmitHandler = (data: {
  user: string;
  email: string;
  password: string;
}) => Promise<void>;

export type OnChangeHandler = (value: string, input: string) => void;
export interface InputList {
  user: UserInput;
  email: EmailInput;
  password: PasswordInput;
  passwordConfirm: PasswordConfirm;
  [key: string]: EmailInput | PasswordInput | UserInput | PasswordConfirm;
}

export interface InitialState {
  title: string;
  inputList: InputList;
  buttonList: {
    signUp: {
      type: string;
      label: string;
    };
  };
}


