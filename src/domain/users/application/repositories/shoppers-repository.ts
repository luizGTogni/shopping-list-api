import { Shopper } from "#domain/users/enterprise/entities/shopper.js";

export interface IShoppersRepository {
  findById(id: string): Promise<Shopper | null>;
}
