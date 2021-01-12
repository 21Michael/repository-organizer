import React from "react";
import classes from "./table.module.scss";
import TrHeader from "./components/trHeader/trHeader";
import TrBody from "./components/trBody/trBody";
import { Repository } from "../../../types/storeReduxToolkit/repositories/slices";
import { Note } from "../../../types/storeReduxToolkit/notes/slices";
import { Props } from "../../../types/components/table";

const Table: React.FC<Props> = (props) => {
  return (
    <div className={classes.table__wrapper}>
      <table className={classes.table}>
        <thead className={classes.table__head}>
          {
            <TrHeader
              titles={props.tableHeader.titles}
              user={props.user}
              signedIn={props.signedIn}
              page={props.page}
            />
          }
        </thead>
        <tbody className={classes.table__body}>
          {props.tableBody.map((el: Repository | Note) => (
            <TrBody
              key={el._id}
              trData={el}
              user={props.user}
              signedIn={props.signedIn}
              deleteRowHandler={props.deleteRowHandler}
              page={props.page}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
