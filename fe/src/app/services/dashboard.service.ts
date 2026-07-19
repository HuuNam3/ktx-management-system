import { Injectable } from '@angular/core';
import { DashboardStats, RevenueEntry, RoomDistribution, TimelineActivity, Alert } from '../models/dashboard.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getStats(): Observable<DashboardStats> {
    return of({
      totalGuests: 156,
      emptyRooms: 23,
      revenue: 45_600_000,
      alerts: 5,
    });
  }

  getRevenueData(): Observable<RevenueEntry[]> {
    return of([
      { date: '11/07', value: 5200000 },
      { date: '12/07', value: 6800000 },
      { date: '13/07', value: 4100000 },
      { date: '14/07', value: 7500000 },
      { date: '15/07', value: 6200000 },
      { date: '16/07', value: 8900000 },
      { date: '17/07', value: 7100000 },
    ]);
  }

  getRoomDistribution(): Observable<RoomDistribution[]> {
    return of([
      { type: 'Phòng đơn', count: 20, color: '#2563EB' },
      { type: 'Phòng đôi', count: 35, color: '#16A34A' },
      { type: 'Phòng ba', count: 25, color: '#F59E0B' },
      { type: 'Phòng bốn', count: 15, color: '#8B5CF6' },
    ]);
  }

  getTimeline(): Observable<TimelineActivity[]> {
    return of([
      { id: 1, type: 'checkin', title: 'Check-in mới', description: 'Nguyễn Văn A - Phòng A101', time: '2 phút trước' },
      { id: 2, type: 'payment', title: 'Thanh toán', description: 'Trần Thị B - 1.200.000đ', time: '15 phút trước' },
      { id: 3, type: 'checkin', title: 'Check-in mới', description: 'Lê Văn C - Phòng B201', time: '32 phút trước' },
      { id: 4, type: 'checkout', title: 'Check-out', description: 'Phạm Thị D - Phòng A102', time: '1 giờ trước' },
      { id: 5, type: 'register', title: 'Đăng ký mới', description: 'Hoàng Văn E - Phòng C301', time: '2 giờ trước' },
    ]);
  }

  getAlerts(): Observable<Alert[]> {
    return of([
      { id: 1, type: 'danger', title: 'Quá hạn thanh toán 7 ngày - Phòng A101', time: '1 giờ trước' },
      { id: 2, type: 'warning', title: 'Bảo trì định kỳ hệ thống điện - Dãy B', time: '3 giờ trước' },
      { id: 3, type: 'info', title: 'Đề xuất thay bóng đèn hành lang - Tầng 2', time: '5 giờ trước' },
      { id: 4, type: 'danger', title: 'Sự cố nước rò rỉ - Phòng C302', time: '6 giờ trước' },
      { id: 5, type: 'info', title: 'Lịch vệ sinh định kỳ - Ngày 20/07', time: '8 giờ trước' },
    ]);
  }
}
