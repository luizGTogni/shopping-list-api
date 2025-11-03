import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import { GetShoppingListUseCase } from "./get-shopping-list";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let sut: GetShoppingListUseCase;

describe("Get ShoppingList", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    sut = new GetShoppingListUseCase(shoppingListsRepository);
  });

  it("should be able to get a shopping list", async () => {
    const shoppingListCreated = makeShoppingList({ shopperId: new UniqueEntityID("1") });

    shoppingListsRepository.create(shoppingListCreated);

    const result = await sut.execute({
      shopperId: "1",
      shoppingListId: shoppingListCreated.id.toString(),
    });

    if (result.isSucceeded()) {
      expect(result.value.shoppingList.title).toEqual(shoppingListCreated.title);
      expect(result.value.shoppingList.shopperId).toEqual(shoppingListCreated.shopperId);
    }
  });

  it("should not be able to get a shopping list if shopping list not exists", async () => {
    const result = await sut.execute({
      shopperId: "1",
      shoppingListId: "1",
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ShoppingListNotFoundError);
  });

  it("should not be able to get a shopping list if shopper not owner of list", async () => {
    const shoppingListCreated = makeShoppingList({ shopperId: new UniqueEntityID("1") });

    shoppingListsRepository.create(shoppingListCreated);

    const result = await sut.execute({
      shopperId: "100",
      shoppingListId: shoppingListCreated.id.toString(),
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
