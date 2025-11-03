import { Product } from "#domain/shopping-list/enterprise/entities/product.js";

export interface IProductsRepository {
  create(product: Product): Promise<void>;
}
