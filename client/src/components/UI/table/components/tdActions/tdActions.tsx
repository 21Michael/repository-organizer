import React from "react";
import classes from "./tdActions.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { Props } from "../../../../../types/components/tdActions";

const TdAction: React.FC<Props> = (props) => {
  return (
    <td className={classes.td}>
      <NavLink
        to={{
          pathname: `${props.location.pathname}/edit`,
          hash: `#${props.id}/${props.repositoryId}`,
          state: { data: props.state },
        }}
        className={classes.edit}
      >
        <FontAwesomeIcon icon="edit" />
      </NavLink>
      <button
        className={classes.delete}
        onClick={() => props.deleteRowHandler(props.id)}
      >
        <FontAwesomeIcon icon="trash-alt" />
      </button>
    </td>
  );
};

export default withRouter(TdAction);
