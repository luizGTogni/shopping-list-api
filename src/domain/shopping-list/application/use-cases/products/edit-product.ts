import { Either, fail, success } from "#core/either.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ProductNotFoundError } from "#core/errors/types/product-not-found-error.js";
import { ProductImage } from "#domain/shopping-list/enterprise/entities/product-image.js";
import { Product } from "#domain/shopping-list/enterprise/entities/product.js";
import { IProductsRepository } from "../../repositories/products-repository";

interface IEditProductUseCaseRequest {
  productId: string;
  name: string;
  description: string;
  imageId: string;
}

type IEditProductUseCaseResponse = Either<ProductNotFoundError, { product: Product }>;

export class EditProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({
    productId,
    name,
    description,
    imageId,
  }: IEditProductUseCaseRequest): Promise<IEditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      return fail(new ProductNotFoundError());
    }

    if (product.deletedAt) {
      return fail(new ProductNotFoundError());
    }

    product.name = name;
    product.description = description;
    product.image = ProductImage.create({
      imageId: new UniqueEntityID(imageId),
      productId: product.id,
    });

    await this.productsRepository.save(product);

    return success({ product });
  }
}
