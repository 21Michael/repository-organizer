export interface Props {
  name?: string;
  profileURL?: string;
  avatarURL?: string;
  logOutButton: {
    classModifier: string;
    name: string;
    label: string;
  };
  logOutButtonHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

