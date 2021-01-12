import { Control } from "react-hook-form";

export interface Props {
  name: string;
  placeholder: string;
  onChangeHandler: (value: string, name: string) => void;
  disabled: boolean;
  control?: Control;
  options: {
    value: string;
    label: string;
    [key: string]: string;
  }[];
  rules?: Object;
  value?: {
    value: string;
    label: string;
  }
  error: {
    message: string;
  };
  register: Function;
}
