import { IShoppingListsRepository } from "#domain/shopping-list/application/repositories/shopping-lists-repository.js";
import { ShoppingList } from "#domain/shopping-list/enterprise/entities/shopping-list.js";

export class InMemoryShoppingListsRepository implements IShoppingListsRepository {
  public items: ShoppingList[] = [];

  async create(shoppingList: ShoppingList): Promise<void> {
    this.items.push(shoppingList);
  }
}
