import { Shopper } from "#domain/users/enterprise/entities/shopper.js";

export interface IUsersRepository {
  findById(id: string): Promise<Shopper | null>;
}
