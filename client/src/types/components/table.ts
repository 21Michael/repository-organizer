import { Repository } from "../storeReduxToolkit/repositories/slices";
import { User } from "../storeReduxToolkit/auth/slices";
import { Note } from "../storeReduxToolkit/notes/slices";

export interface Props {
  tableBody: Array<Repository | Note>;
  tableHeader: {
    titles: string[];
  };
  user?: User;
  deleteRowHandler: (id: string) => void;
  signedIn: boolean;
  page: string;
}
