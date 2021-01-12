import { Repository } from "./slices";

export interface AddRepositoryProps extends Repository { }
export interface AddRepositoryResponse {
  headers: {
    location: {
      match(RegExp: RegExp): string
    }
  }
}
export interface EditRepositoryProps { id: string, repo: Repository };
export interface RepositoryGitHubResponse {
  data: {
    map: (el: Object) => Repository[]
  }
}
export interface RepositoryGitHub {
  id: string;
  name: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string
  };
  created_at: Object;
  [key: string]: number | string | Object;
}
export interface RepositoryLocal {
  id: string;
  name: string;
  description: string;
  stars: number;
  creator_name: string
  created_at: Date;
  [key: string]: number | string | Date;
}
