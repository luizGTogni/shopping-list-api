import { IProductsShoppingListRepository } from "#domain/shopping-list/application/repositories/products-shopping-list-repository.js";
import { ProductShoppingList } from "#domain/shopping-list/enterprise/entities/product-shopping-list.js";

export class InMemoryProductsShoppingListRepository implements IProductsShoppingListRepository {
  public items: ProductShoppingList[] = [];

  async update(productShoppingList: ProductShoppingList): Promise<void> {
    this.items = this.items.filter((item) => !item.equals(productShoppingList));
    this.items.push(productShoppingList);
  }

  async findById(id: string): Promise<ProductShoppingList | null> {
    return this.items.find((item) => item.id.toString() === id) || null;
  }
}
