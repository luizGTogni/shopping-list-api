import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { UserImage } from "#domain/users/enterprise/entities/user-image.js";
import { IUserProps, User } from "#domain/users/enterprise/entities/user.js";
import { Password } from "#domain/users/enterprise/entities/value-objects/password.js";
import { faker } from "@faker-js/faker";

export function makeShopper(override: Partial<IUserProps> = {}, id?: UniqueEntityID) {
  const password = new Password();
  password.toHash("123456");

  const shopper = User.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password,
      role: "SHOPPER",
      profileImage: UserImage.create({
        userId: new UniqueEntityID(),
        imageId: new UniqueEntityID(),
      }),
      ...override,
    },
    id,
  );
  return shopper;
}
