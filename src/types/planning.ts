export type ShiftSlot = '07h-19h' | '19h-07h';
export type AvailabilityStatus = 'Disponible' | 'Indisponible' | 'À confirmer';

export interface PlanningItem {
  id: string;
  date: string;
  slot: ShiftSlot;
  status: AvailabilityStatus;
  requiredSkills?: string[];
}