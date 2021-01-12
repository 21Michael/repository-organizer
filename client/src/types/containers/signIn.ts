import { RouteComponentProps } from "react-router-dom";
import { IconName } from "@fortawesome/fontawesome-svg-core";

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
interface Email extends Input {
  rules?: {
    required: { value: boolean; message: string };
    validate: {
      isEmail: (value: string) => boolean | string;
    };
  };
}
interface Password extends Input {
  rules?: {
    required: { value: boolean; message: string };
    minLength: {
      value: number;
      message: string;
    };
  };
}

export type OnSubmitHandler = (data: {
  email: string;
  password: string;
}) => Promise<void>;
export type OnChangeHandler = (value: string, input: string) => void;
export interface InputList {
  email: Email;
  password: Password;
  [key: string]: Email | Password;
}

export interface InitialState {
  title: string;
  inputList: InputList;
  buttonList: {
    signIn: {
      type: string;
      label: string;
    };

    signUp: {
      type: string;
      label: string;
      to: string;
      classModifier: string;
    };
    github: {
      type: string;
      name: string;
      icon: IconName;
      to: string;
    };
  };
}

