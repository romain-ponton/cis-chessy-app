export interface TrainingItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TrainingDocument {
  id: string;
  name: string;
  fileUrl: string;
}

export interface TrainingProgress {
  percentage: number;
  items: TrainingItem[];
}