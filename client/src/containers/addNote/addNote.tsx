import React, { useState, useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import classes from "./addNote.module.scss";
import Immutable from "seamless-immutable";
import Time from "../../utiles/time";
import { actions } from "../../storeReduxToolkit/notes/slices";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import { Repository } from "../../types/storeReduxToolkit/repositories/slices";
import { AppDispatch } from "../../storeReduxToolkit/configStore";
import Form from "../../components/UI/form/form";
import {
  Props,
  RepositoryInput,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/addNote";

const AddNote: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const history = props.history;

  const repositories: Repository[] = useSelector(
    (state: RootReducer) =>
      Immutable.asMutable(state.repositories.repositories),
    shallowEqual
  );
  const repositoryToSelectInput: RepositoryInput["options"] = repositories.map(
    (el) => ({
      value: el._id,
      label: el.name,
    })
  );
  const noteAddSuccess: boolean = useSelector(
    (state: RootReducer) => state.notes.noteAddSuccess,
    shallowEqual
  );

  const noteAddSuccessHandler: () => void = useCallback(() => {
    history.push("/note");
    dispatch(actions.addNoteFailed());
  }, [dispatch, history]);

  useEffect(() => {
    if (noteAddSuccess) {
      noteAddSuccessHandler();
    }
  }, [noteAddSuccess, noteAddSuccessHandler]);

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
    const repositoryId: string = data.repository.value;
    const text: string = data.text;
    const createdAt: string = (Time as Function)().toDateInputValue();

    await dispatch(
      actions.addNote({
        repositoryId,
        text,
        createdAt,
      })
    );
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
