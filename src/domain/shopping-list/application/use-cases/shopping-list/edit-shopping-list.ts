import { Either, fail, success } from "#core/either.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import type { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";
import type { IShoppingListsRepository } from "../../repositories/shopping-lists-repository";

interface IEditShoppingListUseCaseRequest {
  shopperId: string;
  shoppingListId: string;
  title: string;
}

type IEditShoppingListUseCaseResponse = Either<
  ShoppingListNotFoundError | NotAllowedError,
  { shoppingList: ShoppingList }
>;

export class EditShoppingListUseCase {
  constructor(private readonly shoppingListsRepository: IShoppingListsRepository) {}

  async execute({
    shopperId,
    shoppingListId,
    title,
  }: IEditShoppingListUseCaseRequest): Promise<IEditShoppingListUseCaseResponse> {
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

    shoppingList.title = title;

    await this.shoppingListsRepository.save(shoppingList);

    return success({ shoppingList });
  }
}
