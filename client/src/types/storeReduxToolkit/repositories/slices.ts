export interface Repository {
  _id: string;
  name: string;
  description: string;
  stars: string;
  creatorName: string;
  createdAt: string;
  [key: string]: string;
}

export interface InitialState {
  repositories: Repository[];
  repositoryEditSuccess: boolean;
  repositoryAddSuccess: boolean;
}

