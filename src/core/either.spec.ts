import { fail, success, type Either } from "./either.js";

const doSomething = (shouldSuccess: boolean): Either<string, string> => {
  if (shouldSuccess) {
    return success("success");
  }

  return fail("error");
};

test("success result", () => {
  const result = doSomething(true);

  expect(result.isFailed()).toBe(false);
  expect(result.isSucceeded()).toBe(true);
});

test("failure result", () => {
  const result = doSomething(false);

  expect(result.isFailed()).toBe(true);
  expect(result.isSucceeded()).toBe(false);
});
