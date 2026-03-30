import { UserRole } from '../types/role';

export const ROLES: Record<UserRole, string> = {
  utilisateur: 'Utilisateur',
  centre_appel: 'Centre d’appel',
  admin: 'Administrateur',
};