import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ProductNotFoundError } from "#core/errors/types/product-not-found-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { UsersService } from "#domain/shopping-list/infrastructure/users-service.js";
import { makeProduct } from "#test/factories/make-product.js";
import { makeShopper } from "#test/factories/make-shopper.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryProductsRepository } from "#test/repositories/in-memory-products-repository.js";
import { InMemoryProductsShoppingListRepository } from "#test/repositories/in-memory-products-shopping-list-repository.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import { InMemoryUsersRepository } from "#test/repositories/in-memory-users-repository.js";
import type { IUsersService } from "../../services/users-service-interface";
import { AddProductInProductListUseCase } from "./add-product-in-shopping-list";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let usersRepository: InMemoryUsersRepository;
let productsRepository: InMemoryProductsRepository;
let productsShoppingListRepository: InMemoryProductsShoppingListRepository;
let usersService: IUsersService;
let sut: AddProductInProductListUseCase;

describe("Add Product In Shopping List", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    usersRepository = new InMemoryUsersRepository();
    productsRepository = new InMemoryProductsRepository();
    productsShoppingListRepository = new InMemoryProductsShoppingListRepository();
    usersService = new UsersService(usersRepository);
    sut = new AddProductInProductListUseCase(
      shoppingListsRepository,
      productsRepository,
      productsShoppingListRepository,
      usersService,
    );
  });

  it("should be able to add product in shopping list", async () => {
    const shopperCreated = makeShopper();
    const productCreated = makeProduct();
    const shoppingListCreated = makeShoppingList({ shopperId: shopperCreated.id });

    shoppingListsRepository.create(shoppingListCreated);
    productsRepository.create(productCreated);
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
      productId: productCreated.id.toString(),
      quantity: 4,
    });

    if (result.isSucceeded()) {
      expect(shoppingListsRepository.items).toHaveLength(1);
      expect(result.value.shoppingList.title).toEqual(shoppingListCreated.title);
      expect(result.value.shoppingList.shopperId).toEqual(shopperCreated.id);
      expect(result.value.shoppingList.products.currentItems[0].productId).toEqual(
        productCreated.id,
      );
      expect(result.value.shoppingList.products.currentItems[0].quantity).toEqual(4);
    }
  });

  it("should be able to edit product in shopping list if product already list", async () => {
    const shopperCreated = makeShopper();
    const productCreated = makeProduct();
    const shoppingListCreated = makeShoppingList({ shopperId: shopperCreated.id });

    shoppingListsRepository.create(shoppingListCreated);
    productsRepository.create(productCreated);
    usersRepository.items.push(shopperCreated);

    let result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
      productId: productCreated.id.toString(),
      quantity: 4,
    });

    if (result.isSucceeded()) {
      expect(shoppingListsRepository.items[0].products.currentItems).toHaveLength(1);
      expect(result.value.shoppingList.products.currentItems[0].quantity).toEqual(4);
    }

    result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
      productId: productCreated.id.toString(),
      quantity: 8,
    });

    if (result.isSucceeded()) {
      expect(shoppingListsRepository.items[0].products.currentItems).toHaveLength(1);
      expect(result.value.shoppingList.products.currentItems[0].quantity).toEqual(8);
    }
  });

  it("should not be able to done a shopping list if shopper not exists", async () => {
    const result = await sut.execute({
      shopperId: "1",
      shoppingListId: "1",
      productId: "1",
      quantity: 4,
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ShopperNotFoundError);
  });

  it("should not be able to done a shopping list if product not exists", async () => {
    const shopperCreated = makeShopper();
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: "1",
      productId: "1",
      quantity: 4,
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ProductNotFoundError);
  });

  it("should not be able to done a shopping list if shopping list not exists", async () => {
    const shopperCreated = makeShopper();
    const productCreated = makeProduct();
    productsRepository.create(productCreated);
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: "1",
      productId: productCreated.id.toString(),
      quantity: 4,
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ShoppingListNotFoundError);
  });

  it("should not be able to done a shopping list if shopper not list owner", async () => {
    const shopperCreated = makeShopper();
    const productCreated = makeProduct();
    const shoppingListCreated = makeShoppingList({ shopperId: new UniqueEntityID("1") });

    shoppingListsRepository.create(shoppingListCreated);
    productsRepository.create(productCreated);
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
      productId: productCreated.id.toString(),
      quantity: 4,
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
