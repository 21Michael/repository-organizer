import React, { useState } from "react";
import classes from "./addRepo.module.scss";
import Time from "../../utiles/time";
import { withRouter } from "react-router";
import Form from "../../components/UI/form/form";
import {
  Props,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/addRepo";
import { useMutation } from "@apollo/client";
import { ADD_REPOSITORY_MUTATION} from './query';
import { REPOSITORIES_QUERY } from "../repositories/query";

const AddRepo: React.FC<Props> = ({ history }) => {

  const [addRepository] = useMutation(ADD_REPOSITORY_MUTATION, {
    onCompleted: () => {
      history.push("/");
    },
    update: (cache, {data}) => {
      const { addRepository: newRepository } = data;
      const { repositories }:any = cache.readQuery({query:REPOSITORIES_QUERY});

      if(!newRepository && !repositories) return null;

      cache.writeQuery({
        query: REPOSITORIES_QUERY,
        data: { repositories: [...repositories, newRepository] },
      });
    }
  });

  const initialState: InitialState = {
    title: `Add a repository`,
    inputList: {
      name: {
        element: "input",
        name: "name",
        value: "",
        type: "text",
        label: "Name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      description: {
        element: "textarea",
        name: "description",
        value: "",
        label: "Description",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      stars: {
        element: "input",
        name: "stars",
        value: "",
        type: "number",
        label: "Stars",
        rules: {
          required: { value: true, message: "required" },
          min: { value: 0, message: "min value: 0" },
        },
      },
      creator_name: {
        element: "input",
        name: "creator_name",
        value: "",
        type: "text",
        label: "Creator Name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      created_at: {
        element: "input",
        name: "created_at",
        value: Time().toDateInputValue(),
        type: "date",
        label: "Created At",
        rules: {
          required: { value: true, message: "required" },
          validate: {
            notInFuture: (date: Date) =>
              !Time(date).isFuture() ||
              "the repository cannot be created in the future",
          },
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

  const onSubmitHandler: OnSubmitHandler = (data) => addRepository({variables:{ data }});

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

export default withRouter(AddRepo);
