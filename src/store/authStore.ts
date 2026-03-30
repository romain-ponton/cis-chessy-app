import { create } from 'zustand';
import { UserRole } from '../types/role';

type AuthState = {
  isAuthenticated: boolean;
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: 'utilisateur',
  login: (role) => set({ isAuthenticated: true, role }),
  logout: () => set({ isAuthenticated: false, role: 'utilisateur' }),
}));