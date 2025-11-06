import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ShopperNotFoundError } from "#core/errors/types/shopper-not-found-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { UsersService } from "../../../../../infrastructure/services/users-service.js";
import { makeShopper } from "#test/factories/make-shopper.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryUsersRepository } from "#test/repositories/in-memory-users-repository.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import type { IUsersService } from "../../services/users-service-interface";
import { DeleteShoppingListUseCase } from "./delete-shopping-list";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let usersRepository: InMemoryUsersRepository;
let usersService: IUsersService;
let sut: DeleteShoppingListUseCase;

describe("Delete ShoppingList", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    usersRepository = new InMemoryUsersRepository();
    usersService = new UsersService(usersRepository);
    sut = new DeleteShoppingListUseCase(shoppingListsRepository, usersService);
  });

  it("should be able to delete a shoppingList", async () => {
    const shopperCreated = makeShopper();
    const shoppingListCreated = makeShoppingList({ shopperId: shopperCreated.id });

    shoppingListsRepository.create(shoppingListCreated);
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
    });

    expect(result.isSucceeded()).toBe(true);
    expect(shoppingListsRepository.items).toHaveLength(1);
    expect(shoppingListsRepository.items[0].deletedAt).toEqual(expect.any(Date));
  });

  it("should not be able to delete a shoppingList if shopper not exists", async () => {
    const shoppingListCreated = makeShoppingList();
    shoppingListsRepository.create(shoppingListCreated);

    const result = await sut.execute({
      shopperId: "1",
      shoppingListId: shoppingListCreated.id.toString(),
    });

    expect(result.isFailed()).toBe(true);
    expect(result.value).toBeInstanceOf(ShopperNotFoundError);
  });

  it("should not be able to delete a shoppingList if shopping list not exists", async () => {
    const shopperCreated = makeShopper();
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: "1",
    });

    expect(result.isFailed()).toBe(true);
    expect(result.value).toBeInstanceOf(ShoppingListNotFoundError);
  });

  it("should not be able to delete a shoppingList if shopper not list owner", async () => {
    const shopperCreated = makeShopper();
    const shoppingListCreated = makeShoppingList({ shopperId: new UniqueEntityID("1") });
    shoppingListsRepository.create(shoppingListCreated);
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
    });

    expect(result.isFailed()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should not be able to delete a shoppingList that already deleted", async () => {
    const shopperCreated = makeShopper();
    const shoppingListCreated = makeShoppingList({ shopperId: shopperCreated.id });
    shoppingListCreated.remove();
    shoppingListsRepository.create(shoppingListCreated);
    usersRepository.items.push(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
      shoppingListId: shoppingListCreated.id.toString(),
    });

    expect(result.isFailed()).toBe(true);
    expect(result.value).toBeInstanceOf(ShoppingListNotFoundError);
    expect(shoppingListsRepository.items).toHaveLength(1);
    expect(shoppingListsRepository.items[0].deletedAt).toEqual(expect.any(Date));
  });
});
