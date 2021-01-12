import { RouteComponentProps } from "react-router";
import { User } from "../storeReduxToolkit/auth/slices";

export interface Props extends RouteComponentProps {
  user?: User;
  id: string;
  repositoryId?: string | number;
  state: Object;
  deleteRowHandler: (id: string) => void;
}


