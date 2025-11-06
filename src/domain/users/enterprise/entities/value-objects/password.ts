import { IHasherDriver } from "#core/drivers/hasher-driver-interface.js";
import { BcryptHasherDriver } from "#infra/drivers/bcrypt-hasher-driver.js";

export class Password {
  private readonly hasherDriver: IHasherDriver;
  private _value: string;

  get value() {
    return this._value;
  }

  constructor() {
    this.hasherDriver = new BcryptHasherDriver();
    this._value = "";
  }

  async toHash(plain: string) {
    this._value = await this.hasherDriver.hash(plain);
  }
}
