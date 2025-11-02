import { Either, success } from "#core/either.js";
import { Category } from "#domain/shopping-list/enterprise/entities/category.js";
import { ICategoriesRepository } from "../../repositories/categories-repository";

interface IFetchCategoriesUseCaseRequest {
  page: number;
}

type IFetchCategoriesUseCaseResponse = Either<null, { categories: Category[] }>;

export class FetchCategoriesUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({
    page,
  }: IFetchCategoriesUseCaseRequest): Promise<IFetchCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findMany({ page });

    return success({ categories });
  }
}
