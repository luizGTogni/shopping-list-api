import type { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ProductImage } from "#domain/shopping-list/enterprise/entities/product-image.js";
import { Product, type IProductProps } from "#domain/shopping-list/enterprise/entities/product.js";
import { faker } from "@faker-js/faker";

export function makeProduct(override: Partial<IProductProps> = {}, id?: UniqueEntityID) {
  const product = Product.create(
    {
      name: faker.commerce.productAdjective(),
      description: faker.lorem.sentence(),
      image: ProductImage.create(),
      ...override,
    },
    id,
  );
  return product;
}
