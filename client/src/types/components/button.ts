export interface Props {
  name?: string;
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?:
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;
  classModifier?: string;
}
