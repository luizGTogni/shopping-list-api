import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ProductNotFoundError } from "#core/errors/types/product-not-found-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { makeProductShoppingList } from "#test/factories/make-product-shopping-list.js";
import { makeProduct } from "#test/factories/make-product.js";
import { makeShopper } from "#test/factories/make-shopper.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { InMemoryProductsShoppingListRepository } from "#test/repositories/in-memory-products-shopping-list-repository.js";
import { InMemoryShoppersRepository } from "#test/repositories/in-memory-shoppers-repository.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import { RemoveProductInProductListUseCase } from "./remove-product-in-shopping-list";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let shoppersRepository: InMemoryShoppersRepository;
let productsRepository: InMemoryProductsRepository;
let productsShoppingListRepository: InMemoryProductsShoppingListRepository;
let sut: RemoveProductInProductListUseCase;

describe("Remove Product In Shopping List", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    shoppersRepository = new InMemoryShoppersRepository();
    productsRepository = new InMemoryProductsRepository();
    productsShoppingListRepository = new InMemoryProductsShoppingListRepository();
    sut = new RemoveProductInProductListUseCase(
      shoppingListsRepository,
      shoppersRepository,
      productsShoppingListRepository,
    );
  });

  it("should be able to remove product in shopping list", async () => {
    const shopperCreated = makeShopper();
    const productCreated = makeProduct();
    const shoppingListCreated = makeShoppingList({ shopperId: shopperCreated.id });
    const productShoppingListCreated = makeProductShoppingList({
      shoppingListId: shoppingListCreated.id,
      productId: productCreated.id,
    });

    shoppingListsRepository.create(shoppingListCreated);
    productsRepository.create(productCreated);
    shoppersRepository.items.push(shopperCreated);
    productsShoppingListRepository.update(productShoppingListCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
      productShoppingListId: productShoppingListCreated.id.toString(),
    });

    if (result.isSucceeded()) {
      expect(shoppingListsRepository.items[0].products.currentItems).toHaveLength(0);
      expect(productsShoppingListRepository.items).toHaveLength(0);
    }
  });
});
