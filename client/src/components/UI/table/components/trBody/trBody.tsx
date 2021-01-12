import React from "react";
import classes from "./trBody.module.scss";
import TdAction from "../../components/tdActions/tdActions";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { Props } from "../../../../../types/components/trBody";

const TrBody: React.FC<Props> = (props) => {
  const signedBy = props.user?.signedBy;
  return (
    <tr className={classes.tr}>
      {Object.keys(props.trData).map((key: string, i: number) =>
        key.search(/^_/g) ? (
          <td className={classes.td} key={i}>
            <NavLink
              to={{
                pathname: `${props.location.pathname}/details`,
                hash: `#${props.trData._id}`,
                state: { data: props.trData, page: props.page },
              }}
            >
              {props.trData[key]}
            </NavLink>
          </td>
        ) : null
      )}
      {props.signedIn ? (
        props.page !== "repository" || signedBy === "local" ? (
          <TdAction
            id={props.trData._id}
            state={{ ...props.trData }}
            repositoryId={props.trData.repositoryId}
            deleteRowHandler={props.deleteRowHandler}
          />
        ) : null
      ) : null}
    </tr>
  );
};

export default withRouter(TrBody);
