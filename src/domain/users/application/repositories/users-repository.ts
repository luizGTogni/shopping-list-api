import { User } from "#domain/users/enterprise/entities/user.js";

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
