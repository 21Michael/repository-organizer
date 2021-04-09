import React, { useState } from "react";
import Time from "../../utiles/time";
import classes from "./editRepo.module.scss";
import { withRouter } from "react-router";
import { useMutation } from '@apollo/client';
import Form from "../../components/UI/form/form";
import {
  Props,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/editRepo";
import {UPDATE_REPOSITORY_MUTATION} from './query';

const EditRepo: React.FC<Props> = ({ history, location}) => {
  const editingRepository = location.state?.data;

  const [updateRepository] = useMutation(UPDATE_REPOSITORY_MUTATION, {
    onCompleted: () => {
      history.push("/");
    },
  });

  const initialState: InitialState = {
    title: `Edit a repository`,
    inputList: {
      name: {
        element: "input",
        name: "name",
        value: editingRepository.name,
        type: "text",
        label: "Name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      description: {
        element: "textarea",
        name: "description",
        value: editingRepository.description,
        label: "Description",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      stars: {
        element: "input",
        name: "stars",
        value: editingRepository.stars,
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
        value: editingRepository.creator_name,
        type: "text",
        label: "Creator Name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      created_at: {
        element: "input",
        name: "created_at",
        value: editingRepository.created_at,
        type: "date",
        label: "Created At",
        rules: {
          required: { value: true, message: "required" },
          validate: {
            notInFuture: (date: Date) =>
              !Time(date).isFuture(editingRepository.create_at) ||
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
    })
  };

  const onSubmitHandler: OnSubmitHandler = async (data) => {
    const newRepository = {...data, _id: editingRepository._id};
    await updateRepository({ variables: {data: newRepository} })
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

export default withRouter(EditRepo);
