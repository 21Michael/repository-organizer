import React from "react";
import classes from "./navList.module.scss";
import Item from "./item/item";
import {
  Props,
  Item as ItemInterface,
} from "../../../types/components/navList";

const NavList: React.FC<Props> = ({ navList }) => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {navList.map((el: ItemInterface, i: number) => (
          <Item key={i} item={el} />
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
