import { InMemoryCategoriesRepository } from "#test/repositories/in-memory-categories-repository.js";
import { CreateCategoryUseCase } from "./create-category";

let categoriesRepository: InMemoryCategoriesRepository;
let sut: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new CreateCategoryUseCase(categoriesRepository);
  });

  it("should be able to create a category", async () => {
    const resultExpected = {
      name: "Category Example",
      description: "Description Example",
    };

    const result = await sut.execute({
      name: resultExpected.name,
      description: resultExpected.description,
    });

    expect(result.isSuccessed()).toBe(true);
    expect(categoriesRepository.items).toHaveLength(1);
    expect(result.value?.category.name).toEqual(resultExpected.name);
    expect(result.value?.category.description).toEqual(resultExpected.description);
  });
});
