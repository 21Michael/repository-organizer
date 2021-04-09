import React, { useState } from "react";
import { withRouter } from "react-router";
import classes from "./addNote.module.scss";
import Time from "../../utiles/time";
import Form from "../../components/UI/form/form";
import {
  Props,
  RepositoryInput,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/addNote";
import { useMutation, useQuery } from "@apollo/client";
import { REPOSITORIES_QUERY } from "../repositories/query";
import { ADD_NOTE_MUTATION } from "./query";
import { NOTES_QUERY } from "../notes/query";

const AddNote: React.FC<Props> = (props) => {
  const history = props.history;

  const [addNote] = useMutation(ADD_NOTE_MUTATION, {
    onCompleted: () => {
      history.push("/note");
    },
    update: (cache, {data}) => {
      const { addNote: newNote } = data;
      const { notes }:any = cache.readQuery({query:NOTES_QUERY});

      if(!newNote && !notes) return null;

      cache.writeQuery({
        query: NOTES_QUERY,
        data: { notes: [...notes, newNote] },
      });
    }
  });

  const repositoriesQuery = useQuery(REPOSITORIES_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const { repositories } = repositoriesQuery.data || false;

  const repositoryToSelectInput: RepositoryInput["options"] = repositories.map(
    (el: any) => ({
      value: el._id,
      label: el.name,
    })
  );

  const initialState: InitialState = {
    title: `Add a note`,
    inputList: {
      repository: {
        options: repositoryToSelectInput,
        element: "select",
        name: "repository",
        label: "Repository",
        placeholder: "Dropdown",
        disabled: false,
        value: "",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      text: {
        element: "textarea",
        name: "text",
        value: "",
        label: "Text",
        placeholder: "",
        rules: {
          required: { value: true, message: "required" },
        },
      },
    },
    buttonList: {
      save: {
        type: "submit",
        label: "Save",
      },
    },
  };

  const [form, setForm] = useState<InitialState>(initialState);

  const onChangeHandler: OnChangeHandler = (value, input) => {
    setForm((state: InitialState) => {
      state.inputList[input].value = value;
      return state;
    });
  };

  const onSubmitHandler: OnSubmitHandler = async (data) => {
    const repository_id: string = data.repository.value;
    const text: string = data.text;
    const created_at: string = (Time as Function)().toDateInputValue();
    await addNote({variables: { data: { repository_id, text, created_at } } });
  };

  return (
    <div className={classes.wrapper}>
      <Form
        onSubmit={onSubmitHandler}
        form={form}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
};

export default withRouter(AddNote);
