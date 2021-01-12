import React from "react";
import classes from "./detailsList.module.scss";
import Item from "./item/item";
import { Props } from "../../../types/components/detailsList";

const DetailsList: React.FC<Props> = ({ title, dataList }) => {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{title}</h2>
      <ul className={classes.list}>
        {dataList
          ? Object.keys(dataList).map((key: string, i: number) =>
              !key.search(/^_/g) ? null : (
                <Item label={key} details={dataList[key]} key={i} />
              )
            )
          : null}
      </ul>
    </div>
  );
};

export default DetailsList;
