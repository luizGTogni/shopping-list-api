import { IUseCaseError } from "../use-case-error";

export class CategoryNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super("Category not found.");
  }
}
