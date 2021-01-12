import React, { useState, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classes from "./header.module.scss";
import NavList from "../../components/header/navList/navList";
import Link from "../../components/UI/link/link";
import User from "../../components/header/user/user";
import { actions } from "../../storeReduxToolkit/auth/slices";
import { RootReducer } from "../../types/storeReduxToolkit/rootReducer";
import { User as UserInterface } from "../../types/storeReduxToolkit/auth/slices";
import { AppDispatch } from "../../storeReduxToolkit/configStore";
import { InitialState } from "../../types/containers/header";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const user: UserInterface | undefined = useSelector(
    (state: RootReducer) => state.auth.user,
    shallowEqual
  );
  const signedIn: boolean = useSelector(
    (state: RootReducer) => state.auth.signedIn,
    shallowEqual
  );

  const initialState: InitialState = {
    navList: [
      {
        text: "repository",
        to: "/",
      },
      {
        text: "note",
        to: "/note",
      },
    ],
    logInButton: {
      text: "login",
      to: "/signin",
    },
    logOutButton: {
      classModifier: "logoutButton",
      name: "logout",
      label: "logout",
    },
  };

  const [header] = useState<InitialState>(initialState);

  const logOutButtonHandler: () => void = useCallback(
    () => dispatch(actions.signOutUser()),
    [dispatch]
  );

  return (
    <header className={classes.header}>
      <div className={classes.header__wrapper}>
        <NavList navList={header.navList} />
        <div className={classes.auth}>
          {signedIn ? (
            <User
              name={user?.name}
              profileURL={user?.profileURL}
              avatarURL={user?.avatarURL}
              logOutButton={header.logOutButton}
              logOutButtonHandler={logOutButtonHandler}
            />
          ) : (
            <Link to={header.logInButton.to}>{header.logInButton.text}</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
