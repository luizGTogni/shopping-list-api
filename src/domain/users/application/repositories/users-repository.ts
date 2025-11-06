import { User } from "#domain/users/enterprise/entities/user.js";

export interface IUsersRepository {
  findById(id: string): Promise<User | null>;
}
