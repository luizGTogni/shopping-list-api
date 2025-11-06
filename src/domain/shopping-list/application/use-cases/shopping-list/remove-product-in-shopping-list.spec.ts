import { UsersService } from "#domain/shopping-list/infrastructure/users-service.js";
import { makeProductShoppingList } from "#test/factories/make-product-shopping-list.js";
import { makeProduct } from "#test/factories/make-product.js";
import { makeShopper } from "#test/factories/make-shopper.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { InMemoryProductsShoppingListRepository } from "#test/repositories/in-memory-products-shopping-list-repository.js";
import { InMemoryUsersRepository } from "#test/repositories/in-memory-users-repository.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import type { IUsersService } from "../../services/users-service-interface";
import { RemoveProductInProductListUseCase } from "./remove-product-in-shopping-list";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let usersRepository: InMemoryUsersRepository;
let productsRepository: InMemoryProductsRepository;
let productsShoppingListRepository: InMemoryProductsShoppingListRepository;
let usersService: IUsersService;
let sut: RemoveProductInProductListUseCase;

describe("Remove Product In Shopping List", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    usersRepository = new InMemoryUsersRepository();
    productsRepository = new InMemoryProductsRepository();
    productsShoppingListRepository = new InMemoryProductsShoppingListRepository();
    usersService = new UsersService(usersRepository);
    sut = new RemoveProductInProductListUseCase(
      shoppingListsRepository,
      usersService,
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
    usersRepository.items.push(shopperCreated);
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
