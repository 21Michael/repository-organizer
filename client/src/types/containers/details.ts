import { RouteComponentProps } from "react-router-dom";
import { History } from "history";
import { Repository } from "../entities/repository";
import { Note } from "../entities/note";

export interface Props extends RouteComponentProps {
  location: {
    pathname: string;
    search: string;
    hash: string;
    state: {
      data: Repository | Note;
      page: string;
    };
  };
  history: History;
}

export interface InitialState {
  title: string;
  button: {
    label: string;
  };
  dataList: Repository | Note;
}

