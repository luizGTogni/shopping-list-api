import { IHasherDriver } from "#core/drivers/hasher-driver-interface.js";
import { UserImage } from "#domain/users/enterprise/entities/user-image.js";
import { BcryptHasherDriver } from "#infra/drivers/bcrypt-hasher-driver.js";
import { makeShopper } from "#test/factories/make-shopper.js";
import { InMemoryUsersRepository } from "#test/repositories/in-memory-users-repository.js";
import { CreateShopperUseCase } from "./create-shopper";

let usersRepository: InMemoryUsersRepository;
let hasherDriver: IHasherDriver;
let sut: CreateShopperUseCase;

describe("Create Shopper", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hasherDriver = new BcryptHasherDriver();
    sut = new CreateShopperUseCase(usersRepository, hasherDriver);
  });

  it("should be able to create a shopper", async () => {
    const userData = {
      name: "Product Example",
      email: "Description Example",
      password: "123456",
      profileImageId: "1",
    };

    const result = await sut.execute({
      name: userData.name,
      email: userData.email,
      passwordPlain: userData.password,
      profileImageId: userData.profileImageId,
    });

    if (result.isSucceeded()) {
      expect(usersRepository.items).toHaveLength(1);
      expect(result.value?.shopper.name).toEqual(userData.name);
      expect(result.value?.shopper.email).toEqual(userData.email);
      expect(result.value?.shopper.profileImage).instanceOf(UserImage);
    }
  });

  it("should not be able to create a shopper if email already registered", async () => {
    const shopper = makeShopper();

    const result = await sut.execute({
      name: shopper.name,
      email: shopper.email,
      passwordPlain: "123456",
      profileImageId: "1",
    });

    expect(result.isFailed()).toEqual(true);
  });
});
