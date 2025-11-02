import { makeCategory } from "#test/factories/make-category.js";
import { InMemoryCategoriesRepository } from "#test/repositories/in-memory-categories-repository.js";
import { EditCategoryUseCase } from "./edit-category";

let categoriesRepository: InMemoryCategoriesRepository;
let sut: EditCategoryUseCase;

describe("Edit Category", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new EditCategoryUseCase(categoriesRepository);
  });

  it("should be able to edit a category", async () => {
    const resultExpected = {
      name: "Category Changed",
      description: "Description Changed",
    };

    const categoryCreated = makeCategory();

    categoriesRepository.create(categoryCreated);

    const result = await sut.execute({
      categoryId: categoryCreated.id.toString(),
      name: resultExpected.name,
      description: resultExpected.description,
    });

    if (result.isSucceeded()) {
      expect(result.value.category.name).toEqual(resultExpected.name);
      expect(result.value.category.description).toEqual(resultExpected.description);
    }
  });
});
