import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { ShopperImage } from "#domain/users/enterprise/entities/shopper-image.js";
import { IShopperProps, Shopper } from "#domain/users/enterprise/entities/shopper.js";
import { faker } from "@faker-js/faker";

export function makeShopper(override: Partial<IShopperProps> = {}, id?: UniqueEntityID) {
  const shopper = Shopper.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      profileImage: ShopperImage.create({
        shopperId: new UniqueEntityID(),
        imageId: new UniqueEntityID(),
      }),
      ...override,
    },
    id,
  );
  return shopper;
}
