import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ElectricWaterStats, ElectricWaterRecord } from '../models/electric.model';

@Injectable({ providedIn: 'root' })
export class ElectricService {
  getStats(): Observable<ElectricWaterStats> {
    return of({ totalElectric: 18500000, totalWater: 7200000, collected: 19800000, uncollected: 5900000 });
  }

  getRecords(): Observable<ElectricWaterRecord[]> {
    return of([
      { id: 1, room: 'A101', electricOld: 1250, electricNew: 1320, electricUsage: 70, electricCost: 140000, waterOld: 45, waterNew: 52, waterUsage: 7, waterCost: 35000, total: 175000, status: 'da-thu' },
      { id: 2, room: 'A102', electricOld: 980, electricNew: 1060, electricUsage: 80, electricCost: 160000, waterOld: 30, waterNew: 40, waterUsage: 10, waterCost: 50000, total: 210000, status: 'chua-thu' },
      { id: 3, room: 'A201', electricOld: 2100, electricNew: 2210, electricUsage: 110, electricCost: 220000, waterOld: 60, waterNew: 72, waterUsage: 12, waterCost: 60000, total: 280000, status: 'da-thu' },
      { id: 4, room: 'B101', electricOld: 1500, electricNew: 1580, electricUsage: 80, electricCost: 160000, waterOld: 35, waterNew: 44, waterUsage: 9, waterCost: 45000, total: 205000, status: 'da-thu' },
      { id: 5, room: 'B201', electricOld: 3200, electricNew: 3350, electricUsage: 150, electricCost: 300000, waterOld: 80, waterNew: 95, waterUsage: 15, waterCost: 75000, total: 375000, status: 'chua-thu' },
      { id: 6, room: 'C101', electricOld: 850, electricNew: 910, electricUsage: 60, electricCost: 120000, waterOld: 20, waterNew: 28, waterUsage: 8, waterCost: 40000, total: 160000, status: 'da-thu' },
      { id: 7, room: 'C301', electricOld: 450, electricNew: 520, electricUsage: 70, electricCost: 140000, waterOld: 15, waterNew: 22, waterUsage: 7, waterCost: 35000, total: 175000, status: 'chua-thu' },
      { id: 8, room: 'B301', electricOld: 670, electricNew: 720, electricUsage: 50, electricCost: 100000, waterOld: 10, waterNew: 18, waterUsage: 8, waterCost: 40000, total: 140000, status: 'chua-thu' },
    ]);
  }
}
