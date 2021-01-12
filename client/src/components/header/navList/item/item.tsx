import React from "react";
import classes from "./item.module.scss";
import Link from "../../../UI/link/link";
import { Props } from "../../../../types/components/navItem";

const Item: React.FC<Props> = ({ item }) => {
  return (
    <li className={classes.item}>
      <Link to={item.to}>{item.text}</Link>
    </li>
  );
};

export default Item;
