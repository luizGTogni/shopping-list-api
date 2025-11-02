import { makeCategory } from "#test/factories/make-category.js";
import { InMemoryCategoriesRepository } from "#test/repositories/in-memory-categories-repository.js";
import { FetchCategoriesUseCase } from "./fetch-categories";

let categoriesRepository: InMemoryCategoriesRepository;
let sut: FetchCategoriesUseCase;

describe("Fetch Categories", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new FetchCategoriesUseCase(categoriesRepository);
  });

  it("should be able to fetch all the categories", async () => {
    categoriesRepository.create(makeCategory());
    categoriesRepository.create(makeCategory());
    categoriesRepository.create(makeCategory());

    const result = await sut.execute({
      page: 1,
    });

    expect(result.isSucceeded()).toBe(true);
    expect(categoriesRepository.items).toHaveLength(3);
    expect(result.value?.categories).toHaveLength(3);
  });

  it("should be able to fetch paginated the categories", async () => {
    for (let i = 1; i <= 22; i++) {
      categoriesRepository.create(makeCategory({ name: `Category ${i}` }));
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.isSucceeded()).toBe(true);
    expect(categoriesRepository.items).toHaveLength(22);
    expect(result.value?.categories).toHaveLength(2);
  });
});
