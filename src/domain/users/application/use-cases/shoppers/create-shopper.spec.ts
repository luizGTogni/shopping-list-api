import { UserImage } from "#domain/users/enterprise/entities/user-image.js";
import { InMemoryUsersRepository } from "#test/repositories/in-memory-users-repository.js";
import { CreateShopperUseCase } from "./create-shopper";

let usersRepository: InMemoryUsersRepository;
let sut: CreateShopperUseCase;

describe("Create Shopper", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateShopperUseCase(usersRepository);
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
      password: userData.password,
      profileImageId: userData.profileImageId,
    });

    expect(result.isSucceeded()).toBe(true);
    expect(usersRepository.items).toHaveLength(1);
    expect(result.value?.shopper.name).toEqual(userData.name);
    expect(result.value?.shopper.email).toEqual(userData.email);
    expect(result.value?.shopper.profileImage).instanceOf(UserImage);
  });
});
