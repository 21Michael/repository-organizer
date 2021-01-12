
export interface User {
  id?: string;
  avatarURL?: string;
  email?: string;
  password?: string;
  githubId?: string;
  name?: string;
  profileURL?: string;
  signedBy?: string;
}

export type Notification = { message: string, type: string } | null;
export interface InitialState {
  user?: User
  signedIn: boolean;
  signedUpSuccess: boolean;
  notification: Notification;
}
