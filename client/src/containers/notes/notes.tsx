import React, { useState, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./notes.module.scss";
import ButtonLink from "../../components/UI/buttonLink/buttonLink";
import Table from "../../components/UI/table/table";
import { actions } from "../../storeReduxToolkit/notes/slices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import { Note } from "../../types/storeReduxToolkit/notes/slices";
import { AppDispatch } from "../../storeReduxToolkit/configStore.js";
import { InitialState } from "../../types/containers/notes";

const Notes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const notes: Note[] = useSelector(
    (state: RootReducer) => state.notes.notes,
    shallowEqual
  );
  const signedIn: boolean = useSelector(
    (state: RootReducer) => state.auth.signedIn,
    shallowEqual
  );

  const initialState: InitialState = {
    buttonLink: {
      label: "add",
      to: "note/add",
      classModifier: "add",
    },
    tableHeader: {
      titles: ["id", "repository id", "text", "created at"],
    },
  };

  const [table] = useState<InitialState>(initialState);

  const deleteNoteHandler = useCallback(
    (id: string) => {
      dispatch(actions.deleteNote(id));
    },
    [dispatch]
  );

  return (
    <main className={classes.main}>
      {signedIn ? (
        <div className={classes.main__wrapper}>
          <ButtonLink
            to={table.buttonLink.to}
            label={table.buttonLink.label}
            classModifier={table.buttonLink.classModifier}
          />
          <Table
            tableHeader={table.tableHeader}
            tableBody={notes}
            signedIn={signedIn}
            deleteRowHandler={deleteNoteHandler}
            page="note"
          />
        </div>
      ) : (
        <div className={classes.alert__wrapper}>
          <div className={classes.alert}>
            <FontAwesomeIcon icon="exclamation-circle" />
            <p>Please login for making notes</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Notes;
