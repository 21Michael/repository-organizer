import React, { useState, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./repositories.module.scss";
import ButtonLink from "../../components/UI/buttonLink/buttonLink";
import Table from "../../components/UI/table/table";
import { actions } from "../../storeReduxToolkit/repositories/slices";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import { User } from "../../types/storeReduxToolkit/auth/slices";
import { Repository } from "../../types/storeReduxToolkit/repositories/slices";
import { AppDispatch } from "../../storeReduxToolkit/configStore";
import { InitialState } from "../../types/containers/repositories";

const Repositories: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const signedIn: boolean = useSelector(
    (state: RootReducer) => state.auth.signedIn,
    shallowEqual
  );

  const user: User | undefined = useSelector(
    (state: RootReducer) => state.auth.user,
    shallowEqual
  );
  const repositories: Repository[] = useSelector(
    (state: RootReducer) => state.repositories.repositories,
    shallowEqual
  );

  const initialState: InitialState = {
    buttonLink: {
      label: "add",
      to: "repository/add",
      classModifier: "add",
    },
    tableHeader: {
      titles: ["name", "description", "stars", "creator name", "created at"],
    },
  };

  const [table] = useState<InitialState>(initialState);

  const deleteRepositoryHandler = useCallback(
    (id: string) => dispatch(actions.deleteRepository(id)),
    [dispatch]
  );

  return (
    <main className={classes.main}>
      <div className={classes.main__wrapper}>
        {signedIn && user?.signedBy !== "github" ? (
          <ButtonLink
            to={table.buttonLink.to}
            label={table.buttonLink.label}
            classModifier={table.buttonLink.classModifier}
          />
        ) : null}
        <Table
          tableHeader={table.tableHeader}
          tableBody={repositories}
          deleteRowHandler={deleteRepositoryHandler}
          page="repository"
          signedIn={signedIn}
          user={user}
        />
      </div>
    </main>
  );
};

export default Repositories;
