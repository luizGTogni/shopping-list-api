import { IHasherDriver } from "#core/drivers/hasher-driver-interface.js";
import { Either, fail, success } from "#core/either.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { UserAlreadyExistsError } from "#core/errors/types/user-already-exists-error.js";
import { UserImage } from "#domain/users/enterprise/entities/user-image.js";
import { User } from "#domain/users/enterprise/entities/user.js";
import { Password } from "#domain/users/enterprise/entities/value-objects/password.js";
import { IUsersRepository } from "../../repositories/users-repository";

interface ICreateShopperUseCaseRequest {
  name: string;
  email: string;
  passwordPlain: string;
  profileImageId: string;
}

type ICreateShopperUseCaseResponse = Either<UserAlreadyExistsError, { shopper: User }>;

export class CreateShopperUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hasherDriver: IHasherDriver,
  ) {}

  async execute({
    name,
    email,
    passwordPlain,
    profileImageId,
  }: ICreateShopperUseCaseRequest): Promise<ICreateShopperUseCaseResponse> {
    const shopperAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!shopperAlreadyExists) {
      return fail(new UserAlreadyExistsError());
    }

    const password = new Password(this.hasherDriver);
    await password.toHash(passwordPlain);

    const shopper = User.create({ name, email, password, role: "SHOPPER" });

    const shopperProfileImage = UserImage.create({
      imageId: new UniqueEntityID(profileImageId),
      userId: shopper.id,
    });

    shopper.profileImage = shopperProfileImage;

    await this.usersRepository.create(shopper);

    return success({ shopper });
  }
}
