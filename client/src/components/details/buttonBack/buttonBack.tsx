import React from "react";
import classes from "./buttonBack.module.scss";
import Button from "../../UI/button/button";
import { Props } from "../../../types/components/buttonBack";

const ButtonBack: React.FC<Props> = ({ label, onClick }) => {
  return (
    <div className={classes.button__wrapper}>
      <Button label={label} onClick={onClick} />
    </div>
  );
};

export default ButtonBack;
