export interface Props {
  name: string;
  placeholder: string;
  onChangeHandler: (value: string, name: string) => void;
  register: Function;
  value?: string | number;
  error: {
    message: string;
  };
  rules?: Object;
}
