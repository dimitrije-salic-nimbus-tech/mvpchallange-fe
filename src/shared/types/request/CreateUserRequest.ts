import { Role } from '../../enums/Role';

export type CreateUserRequest = {
  username: string;
  role: Role;
};
