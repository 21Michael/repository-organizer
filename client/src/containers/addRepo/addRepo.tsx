import React, { useState, useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./addRepo.module.scss";
import Time from "../../utiles/time";
import { actions } from "../../storeReduxToolkit/repositories/slices";
import { withRouter } from "react-router";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import { AppDispatch } from "../../storeReduxToolkit/configStore";
import Form from "../../components/UI/form/form";
import {
  Props,
  InitialState,
  OnChangeHandler,
  OnSubmitHandler,
} from "../../types/containers/addRepo";

const AddRepo: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const history = props.history;

  const repositoryAddSuccess: boolean = useSelector(
    (state: RootReducer) => state.repositories.repositoryAddSuccess,
    shallowEqual
  );

  const repositoryAddSuccessHandler: () => void = useCallback(() => {
    history.push("/repository");
    dispatch(actions.addRepositoryFailed());
  }, [dispatch, history]);

  useEffect(() => {
    if (repositoryAddSuccess) {
      repositoryAddSuccessHandler();
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
      creatorName: {
        element: "input",
        name: "creatorName",
        value: "",
        type: "text",
        label: "Creator Name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      createdAt: {
        element: "input",
        name: "createdAt",
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

  const onSubmitHandler: OnSubmitHandler = async (repo) => {
    await dispatch(actions.addRepository(repo));
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

export default withRouter(AddRepo);
