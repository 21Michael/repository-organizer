import { RouteComponentProps } from "react-router";
import { Repository } from "../storeReduxToolkit/repositories/slices";
import { History, Location } from "history";


interface LocationInterface extends Location {
  state: {
    data: Repository;
  };
}
export interface Props extends RouteComponentProps {
  location: LocationInterface;
  history: History;
}

export interface Input {
  element: string;
  name: string;
  value?: string;
  type?: string;
  label: string;
  rules?: {
    required: { value: boolean; message: string };
  };
}

interface NameInput extends Input { }
interface DescriptionInput extends Input { }
interface StarsInput extends Input {
  rules?: {
    required: { value: boolean; message: string };
    min: { value: number; message: string };
  };
}
interface CreatorNameInput extends Input { }
interface CreatedAtInput extends Input {
  rules?: {
    required: { value: boolean; message: string };
    validate: {
      notInFuture: (...args: any[]) => boolean | string;
    };
  };
}
export interface InputList {
  name: NameInput;
  description: DescriptionInput;
  stars: StarsInput;
  creatorName: CreatorNameInput;
  createdAt: CreatedAtInput;
  [key: string]:
  | NameInput
  | DescriptionInput
  | StarsInput
  | CreatorNameInput
  | CreatedAtInput;
}

export type OnSubmitHandler = (repo: Repository) => Promise<void>;
export type OnChangeHandler = (value: string, input: string) => void;

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

