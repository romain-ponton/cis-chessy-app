import { UserRole } from './role';

export type Skill =
  | 'HDR'
  | 'COND VSAV'
  | 'COND PL'
  | 'CA1E'
  | 'CATE';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: UserRole;
  skills: Skill[];
}