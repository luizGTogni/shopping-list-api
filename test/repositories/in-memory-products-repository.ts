import type { IPaginationParams } from "#core/repositories/pagination-params.js";
import { IProductsRepository } from "#domain/shopping-list/application/repositories/products-repository.js";
import { Product } from "#domain/shopping-list/enterprise/entities/product.js";

export class InMemoryProductsRepository implements IProductsRepository {
  private NUMBER_BY_PAGE = 20;
  public items: Product[] = [];

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }

  async findMany({ page }: IPaginationParams): Promise<Product[]> {
    const startIndex = (page - 1) * this.NUMBER_BY_PAGE;
    const endIndex = page * this.NUMBER_BY_PAGE;

    return this.items.sort((a, b) => a.name.localeCompare(b.name)).slice(startIndex, endIndex);
  }
}
