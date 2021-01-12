import { Types } from "../types/utiles/typePrefixer";

const typePrefixer = (types: Types) => {
  const prefix = "repository-organizer/";
  Object.keys(types).forEach((key) => (types[key] = prefix + types[key]));
  return types;
};
export default typePrefixer;
