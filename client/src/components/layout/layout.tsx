import React from "react";
import classes from "./layout.module.scss";
import Error from "../../containers/error/error";
import Header from "../../containers/header/header";
import Repositories from "../../containers/repositories/repositories";
import AddRepo from "../../containers/addRepo/addRepo";
import EditRepo from "../../containers/editRepo/editRepo";
import AddNote from "../../containers/addNote/addNote";
import EditNote from "../../containers/editNote/editNote";
import Details from "../../containers/details/details";
import Notes from "../../containers/notes/notes";
import SignIn from "../../containers/signIn/signIn";
import SignUp from "../../containers/signUp/signUp";
import { Switch, Route, Redirect } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <Switch>
        <Route exact path="/repository">
          <Repositories />
        </Route>
        <Route exact path="/repository/add">
          <AddRepo />
        </Route>
        <Route path="/repository/details">
          <Details />
        </Route>
        <Route path="/repository/edit">
          <EditRepo />
        </Route>
        <Route exact path="/note">
          <Notes />
        </Route>
        <Route exact path="/note/add">
          <AddNote />
        </Route>
        <Route path="/note/details">
          <Details />
        </Route>
        <Route path="/note/edit">
          <EditNote />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Redirect exact from="/" to="/repository" />
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  );
};

export default Layout;
