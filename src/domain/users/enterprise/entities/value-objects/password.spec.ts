import { BcryptHasherDriver } from "#infra/drivers/bcrypt-hasher-driver.js";
import { Password } from "./password";

test("it should be able to create a new password with string plain", async () => {
  const hasherDriver = new BcryptHasherDriver();
  const password = new Password();
  await password.toHash("123456");

  expect(
    await hasherDriver.compare({
      plain: "123456",
      hashed: password.value,
    }),
  ).toEqual(true);
});
