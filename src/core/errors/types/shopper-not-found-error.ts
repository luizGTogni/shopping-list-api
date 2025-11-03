import { IUseCaseError } from "../use-case-error";

export class ShopperNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super("Shopper not found.");
  }
}
