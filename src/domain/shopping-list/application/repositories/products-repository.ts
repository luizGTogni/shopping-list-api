import type { IPaginationParams } from "#core/repositories/pagination-params.js";
import { Product } from "#domain/shopping-list/enterprise/entities/product.js";

export interface IProductsRepository {
  create(product: Product): Promise<void>;
  findMany(params: IPaginationParams): Promise<Product[]>;
}
