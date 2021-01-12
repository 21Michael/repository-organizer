import { User } from './slices';

export interface UserProps extends User { };
export interface CurrentUserResponse {
  id: string;
  signed_by: string;
  user_name: string
  email: string
  github_id: string
  avatar_url: string
  profile_url: string
}

export interface CustomResponse extends Response {
  data: string
}


