import { Repository } from "../entities/repository";
import { User } from "../entities/user";
import { Note } from "../entities/note";

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
