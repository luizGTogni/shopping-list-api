import type { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import {
  Category,
  type ICategoryProps,
} from "#domain/shopping-list/enterprise/entities/category.js";
import { faker } from "@faker-js/faker";

export function makeCategory(override: Partial<ICategoryProps> = {}, id?: UniqueEntityID) {
  const category = Category.create(
    {
      name: faker.commerce.productAdjective(),
      description: faker.lorem.sentence(),
      ...override,
    },
    id,
  );
  return category;
}
