import React from "react";
import classes from "./item.module.scss";
import { Props } from "../../../../types/components/detailsItem";

const Item: React.FC<Props> = ({ label, details }) => {
  return (
    <li className={classes.item}>
      <span className={classes.label}>{label}:</span>
      <p className={classes.details}>{details}</p>
    </li>
  );
};

export default Item;
