import { Control } from "react-hook-form";

interface InputAttributes {
  inform?: string;
  element?: string;
  name: string;
  value: any;
  type: string;
  label: string;
  autoComplete: string;
  placeholder: string;
  disabled: boolean;
  options: {
    value: string;
    label: string;
  }[];
  rules?: Object;
}
interface InputList {
  [key: string]: InputAttributes;
}
export interface Props {
  inputList: InputList;
  errors: {
    [key: string]: { message: string };
  };
  onChangeHandler: (value: string, name: string) => void;
  register: Function;
  control?: Control;
}

