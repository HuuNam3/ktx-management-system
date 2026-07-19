export interface ChecklistStats {
  currentShift: number;
  completed: number;
  remaining: number;
}

export interface ChecklistItem {
  id: number;
  task: string;
  time: string;
  status: 'done' | 'pending';
}
