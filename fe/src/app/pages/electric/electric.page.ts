import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-electric',
  templateUrl: './electric.page.html',
  standalone: true,
  imports: [PageHeaderComponent, LucideIconComponent],
})
export class ElectricPage {
  message = '';

  stats = [
    { label: 'Tổng tiền điện T3', value: '28.5M', icon: 'zap', color: '#B45309', bg: '#FEFCE8', border: '#FDE047' },
    { label: 'Tổng tiền nước T3', value: '12.8M', icon: 'droplet', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    { label: 'Đã thu', value: '85%', icon: '', color: '#059669', bg: '#F0FDF4', border: '#BBF7D0' },
    { label: 'Chưa thu', value: '15%', icon: '', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  ];

  rows = [
    { room: 'A201', eOld: 1250, eNew: 1420, eUse: '170 kWh', eCost: '289.000đ', wOld: 45, wNew: 53, wUse: '8 m³', wCost: '120.000đ', total: '409.000đ', paid: false },
    { room: 'A202', eOld: 1100, eNew: 1245, eUse: '145 kWh', eCost: '246.500đ', wOld: 38, wNew: 45, wUse: '7 m³', wCost: '105.000đ', total: '351.500đ', paid: false },
    { room: 'B305', eOld: 980, eNew: 1180, eUse: '200 kWh', eCost: '340.000đ', wOld: 52, wNew: 62, wUse: '10 m³', wCost: '150.000đ', total: '490.000đ', paid: true },
  ];

  openInput() {
    this.rows = [
      {
        room: 'C108',
        eOld: 1320,
        eNew: 1455,
        eUse: '135 kWh',
        eCost: '229.500đ',
        wOld: 41,
        wNew: 49,
        wUse: '8 m³',
        wCost: '120.000đ',
        total: '349.500đ',
        paid: false,
      },
      ...this.rows,
    ];
    this.show('Đã thêm chỉ số điện nước mới.');
  }

  collect(row: { room: string; paid: boolean }) {
    row.paid = true;
    this.show(`Đã thu tiền phòng ${row.room}`);
  }

  exportReport() {
    this.show('Đã xuất báo cáo điện nước.');
  }

  show(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
