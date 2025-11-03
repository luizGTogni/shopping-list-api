import { IUseCaseError } from "../use-case-error";

export class ProductNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super("Product not found.");
  }
}
