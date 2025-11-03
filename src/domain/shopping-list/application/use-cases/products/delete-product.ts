import { Either, fail, success } from "#core/either.js";
import { ProductNotFoundError } from "#core/errors/types/product-not-found-error.js";
import { IProductsRepository } from "../../repositories/products-repository";

interface IDeleteProductUseCaseRequest {
  productId: string;
}

type IDeleteProductUseCaseResponse = Either<ProductNotFoundError, {}>;

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({
    productId,
  }: IDeleteProductUseCaseRequest): Promise<IDeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      return fail(new ProductNotFoundError());
    }

    if (product.deletedAt) {
      return fail(new ProductNotFoundError());
    }

    product.remove();

    await this.productsRepository.save(product);

    return success({ product });
  }
}
