import type { IPaginationParams } from "#core/repositories/pagination-params.js";
import { ICategoriesRepository } from "#domain/shopping-list/application/repositories/categories-repository.js";
import { Category } from "#domain/shopping-list/enterprise/entities/category.js";

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  private NUMBER_BY_PAGE = 20;
  public items: Category[] = [];

  async create(category: Category): Promise<void> {
    this.items.push(category);
  }

  async save(category: Category): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.equals(category));
    this.items[itemIndex] = category;
  }

  async findById(id: string): Promise<Category | null> {
    return this.items.find((item) => item.id.toString() === id) || null;
  }

  async findMany({ page }: IPaginationParams): Promise<Category[]> {
    const startIndex = (page - 1) * this.NUMBER_BY_PAGE;
    const endIndex = page * this.NUMBER_BY_PAGE;

    return this.items.sort((a, b) => a.name.localeCompare(b.name)).slice(startIndex, endIndex);
  }
}
