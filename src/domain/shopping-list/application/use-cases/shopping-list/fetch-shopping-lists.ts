import { Either, success } from "#core/either.js";
import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";
import { IShoppingListsRepository } from "../../repositories/shopping-lists-repository";

interface IFetchShoppingListsUseCaseRequest {
  shopperId: string;
  page: number;
}

type IFetchShoppingListsUseCaseResponse = Either<null, { shoppingLists: ShoppingList[] }>;

export class FetchShoppingListsUseCase {
  constructor(private readonly shoppingListsRepository: IShoppingListsRepository) {}

  async execute({
    shopperId,
    page,
  }: IFetchShoppingListsUseCaseRequest): Promise<IFetchShoppingListsUseCaseResponse> {
    const shoppingLists = await this.shoppingListsRepository.findManyByShopperId(shopperId, {
      page,
    });

    return success({ shoppingLists });
  }
}
