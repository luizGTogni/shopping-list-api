import { makeCategory } from "#test/factories/make-category.js";
import { InMemoryCategoriesRepository } from "#test/repositories/in-memory-categories-repository.js";
import { GetCategoryUseCase } from "./get-category";

let categoriesRepository: InMemoryCategoriesRepository;
let sut: GetCategoryUseCase;

describe("Get Category", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new GetCategoryUseCase(categoriesRepository);
  });

  it("should be able to get a category", async () => {
    const categoryCreated = makeCategory();

    categoriesRepository.create(categoryCreated);

    const result = await sut.execute({
      categoryId: categoryCreated.id.toString(),
    });

    if (result.isSucceeded()) {
      expect(result.value.category.name).toEqual(categoryCreated.name);
      expect(result.value.category.description).toEqual(categoryCreated.description);
    }
  });
});
