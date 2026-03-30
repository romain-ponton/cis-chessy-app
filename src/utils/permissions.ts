import { UserRole } from '../types/role';

export const permissions = {
  utilisateur: {
    canManageUsers: false,
    canSendAlert: false,
    canManageTraining: false,
    canManageGlobalPlanning: false,
  },
  centre_appel: {
    canManageUsers: false,
    canSendAlert: true,
    canManageTraining: false,
    canManageGlobalPlanning: true,
  },
  admin: {
    canManageUsers: true,
    canSendAlert: true,
    canManageTraining: true,
    canManageGlobalPlanning: true,
  },
} as const;

export function getPermissions(role: UserRole) {
  return permissions[role];
}