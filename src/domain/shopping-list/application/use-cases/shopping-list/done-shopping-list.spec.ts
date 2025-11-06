import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { UsersService } from "#domain/shopping-list/infrastructure/users-service.js";
import { makeShopper } from "#test/factories/make-shopper.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryShoppersRepository } from "#test/repositories/in-memory-shoppers-repository.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import type { IUsersService } from "../../services/users-service-interface";
import { DoneShoppingListUseCase } from "./done-shopping-list";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let shoppersRepository: InMemoryShoppersRepository;
let usersService: IUsersService;
let sut: DoneShoppingListUseCase;

describe("Done ShoppingList", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    shoppersRepository = new InMemoryShoppersRepository();
    usersService = new UsersService(shoppersRepository);
    sut = new DoneShoppingListUseCase(shoppingListsRepository, usersService);
  });

  it("should be able to done a shopping list", async () => {
    const shopperCreated = makeShopper();
    const shoppingListCreated = makeShoppingList({ shopperId: shopperCreated.id });

    shoppingListsRepository.create(shoppingListCreated);
    shoppersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
    });

    if (result.isSucceeded()) {
      expect(shoppingListsRepository.items).toHaveLength(1);
      expect(result.value.shoppingList.title).toEqual(shoppingListCreated.title);
      expect(result.value.shoppingList.shopperId).toEqual(shopperCreated.id);
    }
  });

  it("should not be able to done a shopping list if shopper not exists", async () => {
    const result = await sut.execute({
      shopperId: "1",
      shoppingListId: "1",
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ShopperNotFoundError);
  });

  it("should not be able to done a shopping list if shopping list not exists", async () => {
    const shopperCreated = makeShopper();
    shoppersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: "1",
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ShoppingListNotFoundError);
  });

  it("should not be able to done a shopping list if shopper not list owner", async () => {
    const shopperCreated = makeShopper();
    const shoppingListCreated = makeShoppingList({ shopperId: new UniqueEntityID("1") });

    shoppingListsRepository.create(shoppingListCreated);
    shoppersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
