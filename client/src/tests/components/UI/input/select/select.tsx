import React, { MouseEvent } from "react";
import classes from "./select.module.scss";
import ReactSelect from "react-select";
import { Props } from "../../../../../types/components/select";
import { Controller } from "react-hook-form";

const Select: React.FC<Props> = (props) => {
  const customStyles = {
    control: (provided: Object) => {
      const border = props.error ? "1px solid red" : "1px solid #7f7f7f";
      return {
        ...provided,
        position: "relative",
        border: border,
        "&:hover": {
          border: "1px solid #00f",
          boxShadow: "none",
        },
        "&:blur": {
          border: "none",
          boxShadow: "none",
        },
      };
    },
  };
  return (
    <div className={classes.select__wrapper}>
      <Controller
        styles={customStyles}
        isDisabled={props.disabled}
        as={ReactSelect}
        control={props.control}
        name={props.name}
        options={props.options}
        placeholder={props.placeholder}
        rules={props.rules}
        defaultValue={props.value}
      />
      <span className={classes.input__error}>
        {props.error ? props.error.message : null}
      </span>
    </div>
  );
};

export default Select;
