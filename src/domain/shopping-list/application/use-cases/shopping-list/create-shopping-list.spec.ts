import { InMemoryShoppersRepository } from "#test/repositories/in-memory-shoppers-repository.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import { CreateShoppingListUseCase } from "./create-shopping-list";

let shoppinglistsRepository: InMemoryShoppingListsRepository;
let shoppersRepository: InMemoryShoppersRepository;
let sut: CreateShoppingListUseCase;

describe("Create ShoppingList", () => {
  beforeEach(() => {
    shoppinglistsRepository = new InMemoryShoppingListsRepository();
    shoppersRepository = new InMemoryShoppersRepository();
    sut = new CreateShoppingListUseCase(shoppinglistsRepository, shoppersRepository);
  });

  it("should be able to create a shopping list", async () => {
    const resultExpected = {
      title: "ShoppingList Example",
    };

    const result = await sut.execute({
      title: resultExpected.title,
      shopperId: "1",
    });

    if (result.isSucceeded()) {
      expect(shoppinglistsRepository.items).toHaveLength(1);
      expect(result.value.shoppingList.title).toEqual(resultExpected.title);
      expect(result.value.shoppingList.shopperId.toString()).toEqual("1");
    }
  });

  it("should not be able to create a shopping list if shopper not exists", async () => {
    const resultExpected = {
      title: "ShoppingList Example",
    };

    const result = await sut.execute({
      title: resultExpected.title,
      shopperId: "1",
    });

    expect(result.isFailed()).toEqual(true);
  });
});
