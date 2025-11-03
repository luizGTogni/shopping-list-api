import { Either, fail, success } from "#core/either.js";
import { ProductNotFoundError } from "#core/errors/types/product-not-found-error.js";
import { Product } from "#domain/shopping-list/enterprise/entities/product.js";
import { IProductsRepository } from "../../repositories/products-repository";

interface IGetProductUseCaseRequest {
  productId: string;
}

type IGetProductUseCaseResponse = Either<ProductNotFoundError, { product: Product }>;

export class GetProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({ productId }: IGetProductUseCaseRequest): Promise<IGetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      return fail(new ProductNotFoundError());
    }

    return success({ product });
  }
}
