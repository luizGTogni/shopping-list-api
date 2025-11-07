import { Either, fail, success } from "#core/either.js";
import { UserAlreadyExistsError } from "#core/errors/types/user-already-exists-error.js";
import { User } from "#domain/users/enterprise/entities/user.js";
import { IUsersRepository } from "../../repositories/users-repository";

interface IGetShopperUseCaseRequest {
  shopperId: string;
}

type IGetShopperUseCaseResponse = Either<UserAlreadyExistsError, { shopper: User }>;

export class GetShopperUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({ shopperId }: IGetShopperUseCaseRequest): Promise<IGetShopperUseCaseResponse> {
    const shopper = await this.usersRepository.findById(shopperId);

    if (!shopper) {
      return fail(new UserAlreadyExistsError());
    }

    return success({ shopper });
  }
}
