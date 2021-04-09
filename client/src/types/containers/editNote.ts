import { RouteComponentProps } from "react-router";
import { History } from "history";
import { Note } from "../entities/note";

interface LocationInterface extends Location {
  state: {
    data: Note;
  };
}
export interface Props extends RouteComponentProps {
  location: LocationInterface;
  history: History;
}

export interface Input {
  element: string;
  name: string;
  value?:
  | {
    value: string | number;
    label: string;
  }
  | string
  | number;
  type?: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: {
    required: { value: boolean; message: string };
  };
}
export interface RepositoryInput extends Input {
  options: {
    value: string | number;
    label: string;
  }[];
}
interface TextInput extends Input { }

export type OnSubmitHandler = (data: Note) => Promise<void>;
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


