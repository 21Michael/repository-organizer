import React from "react";
import classes from "./trHeader.module.scss";
import { Props } from "../../../../../types/components/trHeader";

const TrHeader: React.FC<Props> = (props) => {
  const signedBy = props.user?.signedBy;

  return (
    <tr className={classes.tr}>
      {props.titles.map((el: string, i: number) => (
        <th className={classes.th} key={i}>
          {el}
        </th>
      ))}
      {props.signedIn ? (
        props.page !== "repository" || signedBy === "local" ? (
          <th className={`${classes.th} ${classes.th_actions}`}>Actions</th>
        ) : null
      ) : null}
    </tr>
  );
};

export default TrHeader;
