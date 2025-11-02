import { makeCategory } from "#test/factories/make-category.js";
import { InMemoryCategoriesRepository } from "#test/repositories/in-memory-categories-repository.js";
import { DeleteCategoryUseCase } from "./delete-category";

let categoriesRepository: InMemoryCategoriesRepository;
let sut: DeleteCategoryUseCase;

describe("Delete Category", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new DeleteCategoryUseCase(categoriesRepository);
  });

  it("should be able to delete a category", async () => {
    const categoryCreated = makeCategory();

    categoriesRepository.create(categoryCreated);

    const result = await sut.execute({
      categoryId: categoryCreated.id.toString(),
    });

    expect(result.isSucceeded()).toBe(true);
    expect(categoriesRepository.items).toHaveLength(1);
    expect(categoriesRepository.items[0].deletedAt).toEqual(expect.any(Date));
  });

  it("should not be able to delete a category that already deleted", async () => {
    const categoryCreated = makeCategory();
    categoryCreated.remove();
    categoriesRepository.create(categoryCreated);

    const result = await sut.execute({
      categoryId: categoryCreated.id.toString(),
    });

    expect(result.isFailed()).toBe(true);
    expect(categoriesRepository.items).toHaveLength(1);
    expect(categoriesRepository.items[0].deletedAt).toEqual(expect.any(Date));
  });
});
