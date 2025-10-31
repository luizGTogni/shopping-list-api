import { Either, success } from "#core/either.js";
import { Category } from "#domain/shopping-list/enterprise/entities/category.js";
import { ICategoriesRepository } from "../repositories/categories-repository";

interface ICreateCategoryUseCaseRequest {
  name: string;
  description: string;
}

type ICreateCategoryUseCaseResponse = Either<null, { category: Category }>;

export class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({
    name,
    description,
  }: ICreateCategoryUseCaseRequest): Promise<ICreateCategoryUseCaseResponse> {
    const category = Category.create({ name, description });

    await this.categoriesRepository.create(category);

    return success({ category });
  }
}
