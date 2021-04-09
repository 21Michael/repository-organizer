import { Repository } from "../../types/entities/repository";

export const toRepositoryInput = (el: Repository) => ({
  value: el._id,
  label: el.name,
});