import { User } from "../entities/user";

export interface Props {
  titles: string[];
  user?: User;
  signedIn: boolean;
  page: string;
}
