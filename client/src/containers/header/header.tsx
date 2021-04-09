import React, { useState } from "react";
import classes from "./header.module.scss";
import { InitialState } from "../../types/containers/header";
import { useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY, SIGN_OUT_MUTATION } from "./query";
import { withRouter } from "react-router";
import NavList from "../../components/header/navList/navList";
import User from "../../components/header/user/user";
import Link from "../../components/UI/link/link";

const Header: any = () => {
  const { client, loading, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network'
  });
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: () => client.resetStore().catch(err => console.log(err)),
  });

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

  const logOutButtonHandler = () => signOut();

  return (
    <header className={classes.header}>
      <div className={classes.header__wrapper}>
        <NavList navList={header.navList} />
        <div className={classes.auth}>
          {!loading && data ? (
            <User
              name={data.currentUser?.user_name}
              profileURL={data.currentUser?.profile_URL}
              avatarURL={data.currentUser?.avatar_URL}
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

export default withRouter(Header);
