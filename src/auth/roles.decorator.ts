import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const ROLES = (...roles: ('admin' | 'user')[]) =>
  SetMetadata(ROLES_KEY, roles);
