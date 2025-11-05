import { Either, fail, success } from "#core/either.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import type { IShoppersRepository } from "../../../../users/application/repositories/shoppers-repository";
import type { IShoppingListsRepository } from "../../repositories/shopping-lists-repository";

interface IDeleteShoppingListUseCaseRequest {
  shopperId: string;
  shoppingListId: string;
}

type IDeleteShoppingListUseCaseResponse = Either<
  ShoppingListNotFoundError | ShopperNotFoundError | NotAllowedError,
  {}
>;

export class DeleteShoppingListUseCase {
  constructor(
    private readonly shoppingListsRepository: IShoppingListsRepository,
    private readonly shoppersRepository: IShoppersRepository,
  ) {}

  async execute({
    shopperId,
    shoppingListId,
  }: IDeleteShoppingListUseCaseRequest): Promise<IDeleteShoppingListUseCaseResponse> {
    const shopper = await this.shoppersRepository.findById(shopperId);

    if (!shopper) {
      return fail(new ShopperNotFoundError());
    }

    const shoppingList = await this.shoppingListsRepository.findById(shoppingListId);

    if (!shoppingList) {
      return fail(new ShoppingListNotFoundError());
    }

    if (shoppingList.shopperId.toString() !== shopperId) {
      return fail(new NotAllowedError());
    }

    if (shoppingList.deletedAt) {
      return fail(new ShoppingListNotFoundError());
    }

    shoppingList.remove();

    await this.shoppingListsRepository.save(shoppingList);

    return success({ shoppingList });
  }
}
