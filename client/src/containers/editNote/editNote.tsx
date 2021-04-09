import React, { useState } from "react";
import { withRouter } from "react-router";
import classes from "./editNote.module.scss";
import { Repository } from "../../types/entities/repository";
import Form from "../../components/UI/form/form";
import {
  Props,
  Input,
  RepositoryInput,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/editNote";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_NOTE_MUTATION } from './query';
import { REPOSITORIES_QUERY } from "../repositories/query";
import Notification from "../../components/UI/notification/notification";
import {toRepositoryInput} from "./utiles";

const EditNote: React.FC<Props> = ({ history, location}) => {
  const repositoryId: string = location.state?.data.repository_id;

  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION, {
    onCompleted: () => {
      history.push("/note");
    },
  });

  const { loading, data } = useQuery(REPOSITORIES_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const optionsSelectInput: RepositoryInput["options"] = data?.repositories.map(toRepositoryInput);
  const editingRepository: Input["value"] = data?.repositories
    .map(toRepositoryInput)
    .find((el: Repository) => el.value === repositoryId);

  const initialState: InitialState = {
    title: `Edit note`,
    inputList: {
      repository: {
        options: optionsSelectInput,
        element: "select",
        name: "repository",
        label: "Repository",
        placeholder: "Dropdown",
        value: editingRepository,
        disabled: Boolean(location.state),
        rules: {
          required: { value: true, message: "required" },
        },
      },
      text: {
        element: "textarea",
        name: "text",
        value: location.state?.data.text,
        label: "Text",
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
    const note_id: string = location.state?.data._id;
    const text: string = data.text;
    await updateNote({variables: { data: { note_id, text } } });
  };

  return (
    <div className={classes.wrapper}>
      <Form
        onSubmit={onSubmitHandler}
        form={form}
        onChangeHandler={onChangeHandler}
      />
      {loading ? <Notification notification={{ message: "Loading....", type: 'pending' }} /> : null}
    </div>
  );
};

export default withRouter(EditNote);
