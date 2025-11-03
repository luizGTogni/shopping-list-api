import { Shopper } from "#domain/shopping-list/enterprise/entities/shopper.js";

export interface IShoppersRepository {
  findById(id: string): Promise<Shopper | null>;
}
