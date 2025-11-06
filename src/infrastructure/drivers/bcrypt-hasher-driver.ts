import { compare, hash } from "bcrypt";
import { ICompareProps, IHasherDriver } from "#core/drivers/hasher-driver-interface.js";

export class BcryptHasherDriver implements IHasherDriver {
  async hash(plain: string): Promise<string> {
    return await hash(plain, 6);
  }

  async compare(props: ICompareProps): Promise<boolean> {
    return await compare(props.plain, props.hashed);
  }
}
