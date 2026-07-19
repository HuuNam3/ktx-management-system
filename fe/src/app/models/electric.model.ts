export interface ElectricWaterStats {
  totalElectric: number;
  totalWater: number;
  collected: number;
  uncollected: number;
}

export interface ElectricWaterRecord {
  id: number;
  room: string;
  electricOld: number;
  electricNew: number;
  electricUsage: number;
  electricCost: number;
  waterOld: number;
  waterNew: number;
  waterUsage: number;
  waterCost: number;
  total: number;
  status: 'da-thu' | 'chua-thu';
}
