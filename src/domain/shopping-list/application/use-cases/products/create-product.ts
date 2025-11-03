import { Either, success } from "#core/either.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ProductImage } from "#domain/shopping-list/enterprise/entities/product-image.js";
import { Product } from "#domain/shopping-list/enterprise/entities/product.js";
import type { IProductsRepository } from "../../repositories/products-repository";

interface ICreateProductUseCaseRequest {
  name: string;
  description: string;
  imageId: string;
}

type ICreateProductUseCaseResponse = Either<null, { product: Product }>;

export class CreateProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}

  async execute({
    name,
    description,
    imageId,
  }: ICreateProductUseCaseRequest): Promise<ICreateProductUseCaseResponse> {
    const product = Product.create({ name, description });

    const imageProduct = ProductImage.create({
      imageId: new UniqueEntityID(imageId),
      productId: product.id,
    });

    product.image = imageProduct;

    await this.productsRepository.create(product);

    return success({ product });
  }
}
