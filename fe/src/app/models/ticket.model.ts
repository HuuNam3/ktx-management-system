export interface TicketStats {
  mealTickets: number;
  vehicleTickets: number;
  revenue: number;
  mealsServed: number;
}

export interface TicketTransaction {
  id: number;
  type: 'meal' | 'vehicle';
  name: string;
  description: string;
  amount: number;
  time: string;
}
