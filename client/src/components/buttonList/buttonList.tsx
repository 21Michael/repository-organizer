import React from "react";
import ButtonLink from "../UI/buttonLink/buttonLink";
import ButtonAuthNetwork from "../UI/buttonLink/buttonAuthNetwork/buttonAuthNetwork";
import Button from "../UI/button/button";
import classes from "./buttonList.module.scss";
import { Props } from "../../types/components/buttonList";

const ButtonList: React.FC<Props> = (props) => {
  const buttonList: {}[] = [];
  const networkButtonsList: {}[] = [];
  Object.keys(props.buttonList).map((key: string, i: number) =>
    props.buttonList[key].type === "submit"
      ? buttonList.push(
          <Button
            type="submit"
            name="submit"
            label={props.buttonList[key].label} 
            key={i}
          />
        )
      : props.buttonList[key].type === "link"
      ? buttonList.push(
          <ButtonLink
            to={props.buttonList[key].to}
            label={props.buttonList[key].label}
            classModifier={props.buttonList[key].classModifier}
            key={i}
          />
        )
      : props.buttonList[key].type === "network"
      ? networkButtonsList.push(
          <ButtonAuthNetwork
            name={props.buttonList[key].name}
            icon={props.buttonList[key].icon}
            to={props.buttonList[key].to}
            bgColor={props.buttonList[key].bgColor}
            key={i}
          />
        )
      : null
  );

  return (
    <>
      <div className={classes.wrapper}>{buttonList}</div>
      {networkButtonsList}
    </>
  );
};

export default ButtonList;
