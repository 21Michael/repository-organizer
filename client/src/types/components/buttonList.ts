import { IconName } from "@fortawesome/fontawesome-svg-core";

interface ButtonAttributes {
  bgColor?: string;
  label: string;
  type: string;
  name: string;
  to: string;
  classModifier?: string;
  icon?: IconName;
}

export interface Props {
  buttonList: {
    [key: string]: ButtonAttributes;
  };
}

