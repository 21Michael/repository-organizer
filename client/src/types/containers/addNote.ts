import { RouteComponentProps } from "react-router";
import { History, Location } from "history";
import { Control } from "react-hook-form";

export interface Props extends RouteComponentProps {
  register?: Function;
  errors?: {
    [key: string]: { message: string };
  };
  control?: Control<Record<string, any>>;
  location: Location;
  history: History;
}

interface Input {
  element: string;
  name: string;
  type?: string;
  label: string;
  rules?: {
    required: { value: boolean; message: string };
  };
  placeholder: string;
}

export interface RepositoryInput extends Input {
  disabled: boolean;
  options: {
    value: string;
    label: string;
  }[];
  value:
  | {
    value: string;
    label: string;
  }
  | "";
}
export interface TextInput extends Input {
  value: string;
}

export type OnSubmitHandler = (data: {
  text: string;
  repository: { value: string };
}) => Promise<void>;

export type OnChangeHandler = (value: string, input: string) => void;

export interface InputList {
  repository: RepositoryInput;
  text: TextInput;
  [key: string]: TextInput | RepositoryInput;
}

export interface InitialState {
  title: string;
  inputList: InputList;
  buttonList: {
    save: {
      type: string;
      label: string;
    };
  };
}

