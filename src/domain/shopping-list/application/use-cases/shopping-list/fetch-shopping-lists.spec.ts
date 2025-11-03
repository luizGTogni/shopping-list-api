import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { makeShoppingList } from "#test/factories/make-shopping-list.js";
import { InMemoryShoppingListsRepository } from "#test/repositories/in-memory-shopping-list-repository.js";
import { FetchShoppingListsUseCase } from "./fetch-shopping-lists";

let shoppingListsRepository: InMemoryShoppingListsRepository;
let sut: FetchShoppingListsUseCase;

describe("Fetch ShoppingLists", () => {
  beforeEach(() => {
    shoppingListsRepository = new InMemoryShoppingListsRepository();
    sut = new FetchShoppingListsUseCase(shoppingListsRepository);
  });

  it("should be able to fetch all the shoppinglists", async () => {
    shoppingListsRepository.create(makeShoppingList({ shopperId: new UniqueEntityID("1") }));
    shoppingListsRepository.create(makeShoppingList({ shopperId: new UniqueEntityID("1") }));
    shoppingListsRepository.create(makeShoppingList({ shopperId: new UniqueEntityID("1") }));

    const result = await sut.execute({
      shopperId: "1",
      page: 1,
    });

    expect(result.isSucceeded()).toBe(true);
    expect(shoppingListsRepository.items).toHaveLength(3);
    expect(result.value?.shoppingLists).toHaveLength(3);
  });

  it("should be able to fetch paginated the shoppinglists", async () => {
    for (let i = 1; i <= 22; i++) {
      shoppingListsRepository.create(
        makeShoppingList({ title: `List ${i}`, shopperId: new UniqueEntityID("1") }),
      );
    }

    const result = await sut.execute({
      shopperId: "1",
      page: 2,
    });

    expect(result.isSucceeded()).toBe(true);
    expect(shoppingListsRepository.items).toHaveLength(22);
    expect(result.value?.shoppingLists).toHaveLength(2);
  });
});
