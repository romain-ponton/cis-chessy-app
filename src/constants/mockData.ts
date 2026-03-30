import { PlanningItem } from '../types/planning';
import { AppNotification } from '../types/notification';
import { TrainingItem } from '../types/training';

export const MOCK_PLANNING: PlanningItem[] = [
  {
    id: '1',
    date: '2026-04-01',
    slot: '07h-19h',
    status: 'Disponible',
    requiredSkills: ['COND VSAV'],
  },
  {
    id: '2',
    date: '2026-04-01',
    slot: '19h-07h',
    status: 'À confirmer',
    requiredSkills: ['HDR'],
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'Urgence renfort',
    message: 'Besoin de 2 agents disponibles ce soir.',
    urgent: true,
    createdAt: '2026-03-30T10:00:00',
    createdByRole: 'centre_appel',
  },
];

export const MOCK_TRAINING: TrainingItem[] = [
  {
    id: '1',
    title: 'Lecture du livret d’accueil',
    completed: true,
  },
  {
    id: '2',
    title: 'Validation manœuvre incendie',
    completed: false,
  },
];