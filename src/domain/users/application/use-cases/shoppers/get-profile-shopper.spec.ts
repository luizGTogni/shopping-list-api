import { IHasherDriver } from "#core/drivers/hasher-driver-interface.js";
import { UserImage } from "#domain/users/enterprise/entities/user-image.js";
import { makeShopper } from "#test/factories/make-shopper.js";
import { InMemoryUsersRepository } from "#test/repositories/in-memory-users-repository.js";
import { GetShopperUseCase } from "./get-profile-shopper";

let usersRepository: InMemoryUsersRepository;
let sut: GetShopperUseCase;

describe("Get Shopper", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetShopperUseCase(usersRepository);
  });

  it("should be able to get a shopper", async () => {
    const shopperCreated = makeShopper();

    usersRepository.create(shopperCreated);

    const result = await sut.execute({
      shopperId: shopperCreated.id.toString(),
    });

    if (result.isSucceeded()) {
      expect(usersRepository.items).toHaveLength(1);
      expect(result.value?.shopper.name).toEqual(shopperCreated.name);
      expect(result.value?.shopper.email).toEqual(shopperCreated.email);
      expect(result.value?.shopper.profileImage).instanceOf(UserImage);
    }
  });
});
