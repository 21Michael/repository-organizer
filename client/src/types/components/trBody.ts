import { RouteComponentProps } from "react-router";
import { Repository } from "../storeReduxToolkit/repositories/slices";
import { User } from "../storeReduxToolkit/auth/slices";
import { Note } from "../storeReduxToolkit/notes/slices";

export interface Props extends RouteComponentProps {
  user?: User;
  trData: Repository | Note;
  deleteRowHandler: (id: string) => void;
  signedIn: boolean;
  page: string;
}

