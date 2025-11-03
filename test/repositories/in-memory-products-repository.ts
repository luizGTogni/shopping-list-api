import { IProductsRepository } from "#domain/shopping-list/application/repositories/products-repository.js";
import { Product } from "#domain/shopping-list/enterprise/entities/product.js";

export class InMemoryProductsRepository implements IProductsRepository {
  public items: Product[] = [];

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }
}
