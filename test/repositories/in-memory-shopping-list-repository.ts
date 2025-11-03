import { IPaginationParams } from "#core/repositories/pagination-params.js";
import { IShoppingListsRepository } from "#domain/shopping-list/application/repositories/shopping-lists-repository.js";
import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";

export class InMemoryShoppingListsRepository implements IShoppingListsRepository {
  private NUMBER_BY_PAGE = 20;
  public items: ShoppingList[] = [];

  async create(shoppingList: ShoppingList): Promise<void> {
    this.items.push(shoppingList);
  }

  async findManyByShopperId(
    shopperId: string,
    { page }: IPaginationParams,
  ): Promise<ShoppingList[]> {
    const startIndex = (page - 1) * this.NUMBER_BY_PAGE;
    const endIndex = page * this.NUMBER_BY_PAGE;

    return this.items
      .filter((item) => item.shopperId.toString() === shopperId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(startIndex, endIndex);
  }
}
