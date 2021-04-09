import React, { useState } from "react";
import classes from "./notification.module.scss";
import { Props } from "../../../types/components/notification";

const TYPES: any = {
  success: '#44994480',
  error: '#99444480',
  pending: '#99984480'
};

const Notification: React.FC<Props> = ({notification}) => {
  const {message, type}: any = notification;
  const [hidden, setHidden] = useState(false);
  const color: string = TYPES[type];
  if(type !== 'pending') setTimeout(() => setHidden(true), 5000);

  if(hidden) return null;
  return <div className={classes.notification} style={{backgroundColor: color}}>{message}</div>;
};

export default Notification;
