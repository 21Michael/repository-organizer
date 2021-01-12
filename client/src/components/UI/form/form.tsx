import React from "react";
import classes from "./form.module.scss";
import { useForm } from "react-hook-form";
import InputList from "../../inputList/inputList";
import ButtonList from "../../buttonList/buttonList";
import { Props } from "../../../types/components/form";

const Form: React.FC<Props> = (props) => {
  const { register, handleSubmit, errors, control } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: {}) => props.onSubmit(data);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classes.title}> {props.form.title} </h1>
      <InputList
        register={register}
        errors={errors}
        control={control}
        inputList={props.form.inputList}
        onChangeHandler={props.onChangeHandler}
      />
      <ButtonList buttonList={props.form.buttonList} />
    </form>
  );
};

export default Form;
