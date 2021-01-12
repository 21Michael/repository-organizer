import { User } from "../storeReduxToolkit/auth/slices";

export interface Props {
  titles: string[];
  user?: User;
  signedIn: boolean;
  page: string;
}
