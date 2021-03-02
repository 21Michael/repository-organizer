import React from "react";
import classes from "./buttonAuthNetwork.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Props } from "../../../../types/components/buttonAuthNetwork";

const ButtonAuthNetwork: React.FC<Props> = ({to, icon, name, bgColor}) => {
  const fill = bgColor ? bgColor : '#34434b'; 

  return (
    <div className={classes.wrapper}>
      <a href={to} className={classes.link} style={{backgroundColor: fill}}>
        {icon ? <FontAwesomeIcon icon={["fab", icon]} /> : null}
        <span>sign with {name}</span>
      </a>
    </div>
  );
};

export default ButtonAuthNetwork;
