

export interface Props {
  error: {
    message: string;
  };
  inform?: string;
  name: string;
  value?: string | number;
  type: string;
  label?: string;
  autoComplete?: string;
  placeholder?: string;
  rules?: Object;
  onChangeHandler: (value: string, name: string) => void;
  register: Function;
}
