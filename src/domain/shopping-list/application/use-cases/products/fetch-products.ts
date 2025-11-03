import { Either, success } from "#core/either.js";
import { Product } from "#domain/shopping-list/enterprise/entities/product.js";
import { IProductsRepository } from "../../repositories/products-repository";

interface IFetchProductsUseCaseRequest {
  page: number;
}

type IFetchProductsUseCaseResponse = Either<null, { products: Product[] }>;

export class FetchProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ page }: IFetchProductsUseCaseRequest): Promise<IFetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany({ page });

    return success({ products });
  }
}
