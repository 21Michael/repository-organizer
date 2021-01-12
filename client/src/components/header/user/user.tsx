import React from "react";
import classes from "./user.module.scss";
import Button from "../../UI/button/button";
import { Props } from "../../../types/components/user";

const User: React.FC<Props> = (props) => {
  return (
    <>
      <div className={classes.userInfo}>
        <span>{props.name}</span>
        {props.profileURL ? (
          <a href={props.profileURL} className={classes.link}>
            <img src={props.avatarURL} alt={"avatar"} />
          </a>
        ) : null}
      </div>
      <Button
        classModifier={props.logOutButton.classModifier}
        name={props.logOutButton.name}
        onClick={props.logOutButtonHandler}
        label={props.logOutButton.label}
      />
    </>
  );
};

export default User;
