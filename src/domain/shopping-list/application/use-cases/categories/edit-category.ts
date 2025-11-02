import { Either, fail, success } from "#core/either.js";
import { CategoryNotFoundError } from "#core/errors/types/category-not-found-error.js";
import { Category } from "#domain/shopping-list/enterprise/entities/category.js";
import { ICategoriesRepository } from "../../repositories/categories-repository";

interface IEditCategoryUseCaseRequest {
  categoryId: string;
  name: string;
  description: string;
}

type IEditCategoryUseCaseResponse = Either<CategoryNotFoundError, { category: Category }>;

export class EditCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({
    categoryId,
    name,
    description,
  }: IEditCategoryUseCaseRequest): Promise<IEditCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      return fail(new CategoryNotFoundError());
    }

    category.name = name;
    category.description = description;

    await this.categoriesRepository.save(category);

    return success({ category });
  }
}
