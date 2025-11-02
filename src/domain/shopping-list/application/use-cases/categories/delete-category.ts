import { Either, fail, success } from "#core/either.js";
import { CategoryNotFoundError } from "#core/errors/types/category-not-found-error.js";
import { ICategoriesRepository } from "../../repositories/categories-repository";

interface IDeleteCategoryUseCaseRequest {
  categoryId: string;
}

type IDeleteCategoryUseCaseResponse = Either<CategoryNotFoundError, {}>;

export class DeleteCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({
    categoryId,
  }: IDeleteCategoryUseCaseRequest): Promise<IDeleteCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      return fail(new CategoryNotFoundError());
    }

    if (category.deletedAt) {
      return fail(new CategoryNotFoundError());
    }

    category.remove();

    await this.categoriesRepository.save(category);

    return success({ category });
  }
}
