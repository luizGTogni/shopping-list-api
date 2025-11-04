import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import {
  IProductShoppingListProps,
  ProductShoppingList,
} from "#domain/shopping-list/enterprise/entities/product-shopping-list.js";
import { faker } from "@faker-js/faker";

export function makeProductShoppingList(
  override: Partial<IProductShoppingListProps> = {},
  id?: UniqueEntityID,
) {
  const productShoppingList = ProductShoppingList.create(
    {
      productId: new UniqueEntityID(),
      shoppingListId: new UniqueEntityID(),
      quantity: faker.number.int({ min: 2, max: 8 }),
      ...override,
    },
    id,
  );
  return productShoppingList;
}
