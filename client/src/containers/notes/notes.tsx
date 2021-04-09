import React, { useState } from "react";
import classes from "./notes.module.scss";
import ButtonLink from "../../components/UI/buttonLink/buttonLink";
import Table from "../../components/UI/table/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InitialState } from "../../types/containers/notes";
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../header/query";
import { NOTES_QUERY, REMOVE_NOTE_MUTATION } from './query';

const Notes: React.FC = () => {
  const userQuery = useQuery(CURRENT_USER_QUERY);
  const notesQuery = useQuery(NOTES_QUERY);

  const [removeNote] = useMutation(REMOVE_NOTE_MUTATION, {
    update: (cache, {data}) => {
      const { _id } = data.removeNote;
      const { notes }:any = cache.readQuery({query:NOTES_QUERY});

      if(!_id && !notes) return null;

      const newNotes = notes.filter((el: any) => el._id !== _id );
      cache.writeQuery({
        query: NOTES_QUERY,
        data: { notes: [...newNotes] },
      });
    }
  });

  const { currentUser } = userQuery?.data || false;
  const { notes } = notesQuery?.data  || false;

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

  const deleteNoteHandler = (note_id: string) => removeNote({variables: { note_id } });
  
  return (
    <main className={classes.main}>
      {currentUser && notes ? (
        <div className={classes.main__wrapper}>
          <ButtonLink
            to={table.buttonLink.to}
            label={table.buttonLink.label}
            classModifier={table.buttonLink.classModifier}
          />
          <Table
            tableHeader={table.tableHeader}
            tableBody={notes}
            signedIn={!!currentUser}
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
