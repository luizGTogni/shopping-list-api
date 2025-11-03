import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import {
  IShoppingListProps,
  ShoppingList,
} from "#domain/shopping-list/enterprise/entities/shopping-list.js";

import { faker } from "@faker-js/faker";

export function makeShoppingList(override: Partial<IShoppingListProps> = {}, id?: UniqueEntityID) {
  const shoppingList = ShoppingList.create(
    {
      title: faker.lorem.sentence(10),
      shopperId: new UniqueEntityID(),
      ...override,
    },
    id,
  );
  return shoppingList;
}
