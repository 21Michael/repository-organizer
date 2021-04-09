import { RouteComponentProps } from "react-router";
import { Repository } from "../entities/repository";
import { User } from "../entities/user";
import { Note } from "../entities/note";

export interface Props extends RouteComponentProps {
  user?: User;
  trData: Repository | Note;
  deleteRowHandler: (id: string) => void;
  signedIn: boolean;
  page: string;
}

