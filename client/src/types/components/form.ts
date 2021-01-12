

export interface Props {
  onSubmit: Function;
  form: {
    title: string;
    inputList: {};
    buttonList: {};
  };
  onChangeHandler: (value: string, name: string) => void;
}

