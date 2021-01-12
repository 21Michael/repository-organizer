import React from "react";
import classes from "./notification.module.scss";
import { Props } from "../../../types/components/notification";

const Notification: React.FC<Props> = (props) => {
  let notificationClass = classes.notification;
  if (props.notification?.type === "error") {
    notificationClass += ` ${classes.error}`;
  }
  return <div className={notificationClass}>{props.notification?.message}</div>;
};

export default Notification;
