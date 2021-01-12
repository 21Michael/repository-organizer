import React, { useState, useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import classes from "./editNote.module.scss";
import Immutable from "seamless-immutable";
import { AppDispatch } from "../../storeReduxToolkit/configStore";
import { actions } from "../../storeReduxToolkit/notes/slices";
import { Repository } from "../../types/storeReduxToolkit/repositories/slices";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import Form from "../../components/UI/form/form";
import {
  Props,
  Input,
  RepositoryInput,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/editNote";

const EditNote: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const repositoryId: string = props.location.state?.data.repositoryId;
  const history = props.history;
  const repositories: Repository[] = useSelector(
    (state: RootReducer) =>
      Immutable.asMutable(state.repositories.repositories),
    shallowEqual
  );

  const toRepositoryInput = (el: Repository) => ({
    value: el._id,
    label: el.name,
  });
  const optionsSelectInput: RepositoryInput["options"] = repositories.map(
    toRepositoryInput
  );
  const editingRepository: Input["value"] = repositories
    .map(toRepositoryInput)
    .find((el) => el.value === repositoryId);

  const noteEditSuccess: boolean = useSelector(
    (state: RootReducer) => state.notes.noteEditSuccess,
    shallowEqual
  );

  const noteEditSuccessHandler: () => void = useCallback(() => {
    history.push("/note");
    dispatch(actions.editNoteFailed());
  }, [dispatch, history]);

  useEffect(() => {
    if (noteEditSuccess) {
      noteEditSuccessHandler();
    }
  }, [noteEditSuccess, noteEditSuccessHandler]);

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
        disabled: Boolean(props.location.state),
        rules: {
          required: { value: true, message: "required" },
        },
      },
      text: {
        element: "textarea",
        name: "text",
        value: props.location.state?.data.text,
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
    const id: string = props.location.state?.data._id;
    const text: string = data.text;
    await dispatch(actions.editNote({ id, text }));
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

export default withRouter(EditNote);
