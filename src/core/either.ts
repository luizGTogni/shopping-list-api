export class Fail<FailType, SuccessType> {
  public readonly value: FailType;

  constructor(value: FailType) {
    this.value = value;
  }

  isFailed(): this is Fail<FailType, SuccessType> {
    return true;
  }

  isSuccessed(): this is Success<FailType, SuccessType> {
    return false;
  }
}

export class Success<FailType, SuccessType> {
  public readonly value: SuccessType;

  constructor(value: SuccessType) {
    this.value = value;
  }

  isFailed(): this is Fail<FailType, SuccessType> {
    return false;
  }

  isSuccessed(): this is Success<FailType, SuccessType> {
    return true;
  }
}

export type Either<FailType, SuccessType> =
  | Fail<FailType, SuccessType>
  | Success<FailType, SuccessType>;

export const fail = <FailType, SuccessType>(reason: FailType): Either<FailType, SuccessType> =>
  new Fail(reason);
export const success = <FailType, SuccessType>(
  result: SuccessType,
): Either<FailType, SuccessType> => new Success(result);
