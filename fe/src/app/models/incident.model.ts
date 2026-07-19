export interface IncidentStats {
  unresolved: number;
  resolved: number;
  totalCost: number;
  totalIncidents: number;
}

export interface Incident {
  id: number;
  room: string;
  type: string;
  description: string;
  reporter: string;
  date: string;
  cost: number;
  status: 'chua-xu-ly' | 'da-xu-ly';
}
