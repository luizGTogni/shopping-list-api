import type { IUsersRepository } from "#domain/users/application/repositories/users-repository.js";
import type { IUsersService } from "../../domain/shopping-list/application/services/users-service-interface";

export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async exists(id: string): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) return false;

    return true;
  }
}
