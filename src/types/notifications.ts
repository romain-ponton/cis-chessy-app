export interface AppNotification {
  id: string;
  title: string;
  message: string;
  urgent: boolean;
  createdAt: string;
  createdByRole: 'centre_appel' | 'admin';
}