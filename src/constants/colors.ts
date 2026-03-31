export const COLORS = {
  primary: '#1A56DB',
  primaryLight: '#EBF5FF',
  surface: '#FFFFFF',
  surfaceAlt: '#F8FAFC',
  border: '#E2E8F0',
  text: '#0F172A',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  success: '#10B981',
  successLight: '#ECFDF5',
  purple: '#8B5CF6',
  purpleLight: '#F5F3FF',
} as const;

export type ColorKey = keyof typeof COLORS;