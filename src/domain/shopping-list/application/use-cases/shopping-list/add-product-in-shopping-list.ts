import { Either, fail, success } from "#core/either.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ProductNotFoundError } from "#core/errors/types/product-not-found-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { ProductShoppingList } from "#domain/shopping-list/enterprise/entities/product-shopping-list.js";
import type { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";
import type { IProductsRepository } from "../../repositories/products-repository";
import type { IShoppersRepository } from "../../repositories/shoppers-repository";
import type { IShoppingListsRepository } from "../../repositories/shopping-lists-repository";

interface IAddProductInProductListUseCaseRequest {
  shopperId: string;
  shoppingListId: string;
  productId: string;
  quantity: number;
}

type IAddProductInProductListUseCaseResponse = Either<
  ShoppingListNotFoundError | ShopperNotFoundError | ProductNotFoundError | NotAllowedError,
  { shoppingList: ShoppingList }
>;

export class AddProductInProductListUseCase {
  constructor(
    private readonly shoppingListsRepository: IShoppingListsRepository,
    private readonly shoppersRepository: IShoppersRepository,
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute({
    shopperId,
    shoppingListId,
    productId,
    quantity,
  }: IAddProductInProductListUseCaseRequest): Promise<IAddProductInProductListUseCaseResponse> {
    const shopper = await this.shoppersRepository.findById(shopperId);

    if (!shopper) {
      return fail(new ShopperNotFoundError());
    }

    const product = await this.productsRepository.findById(productId);

    if (!product) {
      return fail(new ProductNotFoundError());
    }

    const shoppingList = await this.shoppingListsRepository.findById(shoppingListId);

    if (!shoppingList) {
      return fail(new ShoppingListNotFoundError());
    }

    if (shoppingList.shopperId.toString() !== shopperId) {
      return fail(new NotAllowedError());
    }

    const productAdded = ProductShoppingList.create({
      productId: product.id,
      shoppingListId: shoppingList.id,
      quantity,
    });

    shoppingList.products.update([productAdded]);

    await this.shoppingListsRepository.save(shoppingList);

    return success({ shoppingList });
  }
}
