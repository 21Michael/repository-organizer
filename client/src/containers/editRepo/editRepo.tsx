import React, { useState, useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Time from "../../utiles/time";
import classes from "./editRepo.module.scss";
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
} from "../../types/containers/editRepo";

const EditRepo: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const history = props.history;

  const repositoryEditSuccess: boolean = useSelector(
    (state: RootReducer) => state.repositories.repositoryEditSuccess,
    shallowEqual
  );

  const repositoryEditSuccessHandler: () => void = useCallback(() => {
    history.push("/repository");
    dispatch(actions.editRepositoryFailed());
  }, [dispatch, history]);

  useEffect(() => {
    if (repositoryEditSuccess) {
      repositoryEditSuccessHandler();
    }
  });

  const initialState: InitialState = {
    title: `Edit a repository`,
    inputList: {
      name: {
        element: "input",
        name: "name",
        value: props.location.state?.data.name,
        type: "text",
        label: "Name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      description: {
        element: "textarea",
        name: "description",
        value: props.location.state?.data.description,
        label: "Description",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      stars: {
        element: "input",
        name: "stars",
        value: props.location.state?.data.stars,
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
        value: props.location.state?.data.creatorName,
        type: "text",
        label: "Creator Name",
        rules: {
          required: { value: true, message: "required" },
        },
      },
      createdAt: {
        element: "input",
        name: "createdAt",
        value: props.location.state?.data.createdAt,
        type: "date",
        label: "Created At",
        rules: {
          required: { value: true, message: "required" },
          validate: {
            notInFuture: (date: Date) =>
              !Time(date).isFuture(props.location.state?.data.createdAt) ||
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
    const id = props.location.state?.data._id;
    await dispatch(actions.editRepository({ id, repo }));
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
