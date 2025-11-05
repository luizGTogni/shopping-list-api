import { Either, fail, success } from "#core/either.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";
import { IShoppersRepository } from "../../../../users/application/repositories/shoppers-repository";
import { IShoppingListsRepository } from "../../repositories/shopping-lists-repository";

interface ICreateShoppingListUseCaseRequest {
  shopperId: string;
  title: string;
}

type ICreateShoppingListUseCaseResponse = Either<
  ShopperNotFoundError,
  { shoppingList: ShoppingList }
>;

export class CreateShoppingListUseCase {
  constructor(
    private readonly shoppingListsRepository: IShoppingListsRepository,
    private readonly shoppersRepositories: IShoppersRepository,
  ) {}

  async execute({
    shopperId,
    title,
  }: ICreateShoppingListUseCaseRequest): Promise<ICreateShoppingListUseCaseResponse> {
    const shopper = await this.shoppersRepositories.findById(shopperId);

    if (!shopper) {
      return fail(new ShopperNotFoundError());
    }

    const shoppingList = ShoppingList.create({ shopperId: new UniqueEntityID(shopperId), title });

    await this.shoppingListsRepository.create(shoppingList);

    return success({ shoppingList });
  }
}
