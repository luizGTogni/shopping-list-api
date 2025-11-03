import { IUseCaseError } from "../use-case-error";

export class ShoppingListNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super("Shopping list not found.");
  }
}
