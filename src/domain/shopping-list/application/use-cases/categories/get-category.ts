import { Either, fail, success } from "#core/either.js";
import { CategoryNotFoundError } from "#core/errors/types/category-not-found-error.js";
import { Category } from "#domain/shopping-list/enterprise/entities/category.js";
import { ICategoriesRepository } from "../../repositories/categories-repository";

interface IGetCategoryUseCaseRequest {
  categoryId: string;
}

type IGetCategoryUseCaseResponse = Either<CategoryNotFoundError, { category: Category }>;

export class GetCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({ categoryId }: IGetCategoryUseCaseRequest): Promise<IGetCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      return fail(new CategoryNotFoundError());
    }

    return success({ category });
  }
}
