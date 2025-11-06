import { IUsersRepository } from "#domain/users/application/repositories/users-repository.js";
import { User } from "#domain/users/enterprise/entities/user.js";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.items.find((item) => item.id.toString() === id) || null;
  }
}
