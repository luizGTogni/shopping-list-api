import { Either, fail, success } from "#core/either.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ProductNotFoundError } from "#core/errors/types/product-not-found-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import type { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";
import { IProductsShoppingListRepository } from "../../repositories/products-shopping-list-repository";
import type { IShoppersRepository } from "../../repositories/shoppers-repository";
import type { IShoppingListsRepository } from "../../repositories/shopping-lists-repository";

interface IRemoveProductInProductListUseCaseRequest {
  shopperId: string;
  shoppingListId: string;
  productShoppingListId: string;
}

type IRemoveProductInProductListUseCaseResponse = Either<
  ShoppingListNotFoundError | ShopperNotFoundError | ProductNotFoundError | NotAllowedError,
  { shoppingList: ShoppingList }
>;

export class RemoveProductInProductListUseCase {
  constructor(
    private readonly shoppingListsRepository: IShoppingListsRepository,
    private readonly shoppersRepository: IShoppersRepository,
    private readonly productsShoppingListRepository: IProductsShoppingListRepository,
  ) {}

  async execute({
    shopperId,
    shoppingListId,
    productShoppingListId,
  }: IRemoveProductInProductListUseCaseRequest): Promise<IRemoveProductInProductListUseCaseResponse> {
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

    const productRemoved =
      await this.productsShoppingListRepository.findById(productShoppingListId);

    if (!productRemoved) {
      return fail(new ProductNotFoundError());
    }

    shoppingList.products.remove(productRemoved);
    await this.productsShoppingListRepository.remove(productRemoved);

    await this.shoppingListsRepository.save(shoppingList);

    return success({ shoppingList });
  }
}
