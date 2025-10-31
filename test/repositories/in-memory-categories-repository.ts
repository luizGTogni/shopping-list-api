import { ICategoriesRepository } from "#domain/shopping-list/application/repositories/categories-repository.js";
import { Category } from "#domain/shopping-list/enterprise/entities/category.js";

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  public items: Category[] = [];

  async create(category: Category): Promise<void> {
    this.items.push(category);
  }
}
