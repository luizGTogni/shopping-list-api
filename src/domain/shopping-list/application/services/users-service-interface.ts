export interface IUsersService {
  exists(id: string): Promise<boolean>;
}
