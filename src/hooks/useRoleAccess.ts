import { getPermissions } from '../utils/permissions';
import { UserRole } from '../types/role';

export function useRoleAccess(role: UserRole) {
  return getPermissions(role);
}