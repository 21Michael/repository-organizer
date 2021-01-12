import React from "react";
import classes from "./inputList.module.scss";
import Select from "../UI/input/select/select";
import Input from "../UI/input/input";
import Label from "../UI/label/label";
import TextArea from "../UI/input/textArea/textArea";
import { Props } from "../../types/components/inputList";

const InputList: React.FC<Props> = (props) => {
  const inputList = props.inputList;

  return (
    <div className={classes.wrapper}>
      {Object.keys(inputList).map((key: string, i: number) => (
        <Label key={i} label={inputList[key].label}>
          {inputList[key].element === "input" ? (
            <Input
              error={props.errors[inputList[key].name]}
              register={props.register}
              name={inputList[key].name}
              value={inputList[key].value}
              type={inputList[key].type}
              rules={inputList[key].rules}
              inform={inputList[key].inform}
              placeholder={inputList[key].placeholder}
              onChangeHandler={props.onChangeHandler}
              autoComplete={inputList[key].autoComplete}
            />
          ) : inputList[key].element === "select" ? (
            <Select
              error={props.errors[inputList[key].name]}
              register={props.register}
              control={props.control}
              name={inputList[key].name}
              options={inputList[key].options}
              value={inputList[key].value}
              disabled={inputList[key].disabled}
              placeholder={inputList[key].placeholder}
              rules={inputList[key].rules}
              onChangeHandler={props.onChangeHandler}
            />
          ) : inputList[key].element === "textarea" ? (
            <TextArea
              error={props.errors[inputList[key].name]}
              register={props.register}
              name={inputList[key].name}
              value={inputList[key].value}
              placeholder={inputList[key].placeholder}
              rules={inputList[key].rules}
              onChangeHandler={props.onChangeHandler}
            />
          ) : null}
        </Label>
      ))}
    </div>
  );
};

export default InputList;
