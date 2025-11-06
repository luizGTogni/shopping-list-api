import { Either, fail, success } from "#core/either.js";
import { UniqueEntityID } from "#core/entities/unique-entity-id.js";
import { UserAlreadyExistsError } from "#core/errors/types/user-already-exists-error.js";
import { UserImage } from "#domain/users/enterprise/entities/user-image.js";
import { User } from "#domain/users/enterprise/entities/user.js";
import { IUsersRepository } from "../../repositories/users-repository";

interface ICreateShopperUseCaseRequest {
  name: string;
  email: string;
  password: string;
  profileImageId: string;
}

type ICreateShopperUseCaseResponse = Either<UserAlreadyExistsError, { shopper: User }>;

export class CreateShopperUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    profileImageId,
  }: ICreateShopperUseCaseRequest): Promise<ICreateShopperUseCaseResponse> {
    const shopperAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!shopperAlreadyExists) {
      return fail(new UserAlreadyExistsError());
    }

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
