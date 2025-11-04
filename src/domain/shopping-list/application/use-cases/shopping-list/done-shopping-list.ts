import { Either, fail, success } from "#core/either.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";
import { IShoppersRepository } from "../../repositories/shoppers-repository";
import { IShoppingListsRepository } from "../../repositories/shopping-lists-repository";

interface IDoneShoppingListUseCaseRequest {
  shopperId: string;
  shoppingListId: string;
}

type IDoneShoppingListUseCaseResponse = Either<
  ShopperNotFoundError | ShoppingListNotFoundError | NotAllowedError,
  { shoppingList: ShoppingList }
>;

export class DoneShoppingListUseCase {
  constructor(
    private readonly shoppingListsRepository: IShoppingListsRepository,
    private readonly shoppersRepositories: IShoppersRepository,
  ) {}

  async execute({
    shopperId,
    shoppingListId,
  }: IDoneShoppingListUseCaseRequest): Promise<IDoneShoppingListUseCaseResponse> {
    const shopper = await this.shoppersRepositories.findById(shopperId);

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

    shoppingList.done();

    await this.shoppingListsRepository.save(shoppingList);

    return success({ shoppingList });
  }
}
