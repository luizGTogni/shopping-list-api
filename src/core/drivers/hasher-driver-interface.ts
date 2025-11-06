export interface ICompareProps {
  plain: string;
  hashed: string;
}

export interface IHasherDriver {
  hash(plain: string): Promise<string>;
  compare(props: ICompareProps): Promise<boolean>;
}
