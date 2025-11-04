import { ProductShoppingList } from "#domain/shopping-list/enterprise/entities/product-shopping-list.js";

export interface IProductsShoppingListRepository {
  update(productShoppingList: ProductShoppingList): Promise<void>;
  remove(productShoppingList: ProductShoppingList): Promise<void>;
  findById(id: string): Promise<ProductShoppingList | null>;
}
