import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { NotAllowedError } from "#core/errors/types/not-allowed-error.js";
import { ShoppingListNotFoundError } from "#core/errors/types/shopping-list-not-found-error.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import { EditShoppingListUseCase } from "./edit-shopping-list";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let sut: EditShoppingListUseCase;

describe("Edit ShoppingList", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    sut = new EditShoppingListUseCase(shoppingListsRepository);
  });

  it("should be able to edit a shopping list", async () => {
    const titleExpected = "Shopping list change";

    const shoppingListCreated = makeShoppingList({
      title: titleExpected,
      shopperId: new UniqueEntityID("1"),
    });

    shoppingListsRepository.create(shoppingListCreated);

    const result = await sut.execute({
      shoppingListId: shoppingListCreated.id.toString(),
      title: titleExpected,
      shopperId: "1",
    });

    if (result.isSucceeded()) {
      expect(result.value.shoppingList.title).toEqual(titleExpected);
    }
  });

  it("should not be able to edit a shopping list if shopping list not exists", async () => {
    const result = await sut.execute({
      shoppingListId: "1",
      title: "shopping list change",
      shopperId: "1",
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ShoppingListNotFoundError);
  });

  it("should not be able to edit a shopping list if shopper not list owner", async () => {
    const shoppingListCreated = makeShoppingList({
      title: "Shopping list title",
      shopperId: new UniqueEntityID("1"),
    });

    shoppingListsRepository.create(shoppingListCreated);

    const result = await sut.execute({
      shoppingListId: shoppingListCreated.id.toString(),
      title: "shopping list change",
      shopperId: "100",
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should not be able to edit a shopping list if shopping list deleted", async () => {
    const shoppingListCreated = makeShoppingList({
      title: "Shopping list title",
      shopperId: new UniqueEntityID("1"),
    });

    shoppingListCreated.remove();
    shoppingListsRepository.create(shoppingListCreated);

    const result = await sut.execute({
      shoppingListId: shoppingListCreated.id.toString(),
      title: "shopping list change",
      shopperId: "1",
    });

    expect(result.isFailed()).toEqual(true);
    expect(result.value).toBeInstanceOf(ShoppingListNotFoundError);
  });
});
