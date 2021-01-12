import React, { useState } from "react";
import classes from "./details.module.scss";
import DetailsList from "../../components/details/detailsList/detailsList";
import ButtonBack from "../../components/details/buttonBack/buttonBack";
import { Props, InitialState } from "../../types/containers/details";
import { withRouter } from "react-router-dom";

const Details: React.FC<Props> = (props) => {
  const page = props.location.state?.page;
  const initialState: InitialState = {
    title: `${page} details`,
    button: {
      label: "back",
    },
    dataList: props.location.state?.data,
  };

  const [state] = useState<InitialState>(initialState);

  const onClickHandler: () => void = () => props.history.goBack();

  return (
    <div className={classes.wrapper}>
      <div className={classes.details}>
        <DetailsList dataList={state.dataList} title={state.title} />
        <ButtonBack label={state.button.label} onClick={onClickHandler} />
      </div>
    </div>
  );
};

export default withRouter(Details);
