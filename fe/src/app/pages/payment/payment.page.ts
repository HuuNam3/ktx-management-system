import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

type PaymentStatus = 'overdue' | 'unpaid' | 'partial' | 'paid';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent, LucideIconComponent],
})
export class PaymentPage {
  activeTab = 'debt';
  searchTerm = '';
  statusFilter = 'all';
  message = '';

  tabs = [
    { key: 'debt', label: 'Công nợ', badge: 3 },
    { key: 'paid', label: 'Đã thanh toán' },
    { key: 'history', label: 'Lịch sử' },
    { key: 'shift', label: 'Đối soát ca' },
  ];

  rows = [
    { customer: 'Nguyễn Văn An', phone: '0901234567', room: 'A201', fees: ['Tiền phòng', 'Điện nước'], amount: '1.259.000 đ', due: '05/04/2026', status: 'overdue' as PaymentStatus },
    { customer: 'Trần Thị Bình', phone: '0909876543', room: 'B305', fees: ['Tiền phòng', 'Vé ăn'], amount: '1.150.000 đ', due: '10/04/2026', status: 'unpaid' as PaymentStatus },
    { customer: 'Lê Văn Cường', phone: '0903456789', room: 'C108', fees: ['Tiền phòng', 'Điện nước', 'Phí'], amount: '371.000 đ', paid: 'Đã đóng: 500.000 đ', due: '08/04/2026', status: 'partial' as PaymentStatus },
  ];

  get filteredRows() {
    const q = this.searchTerm.trim().toLowerCase();
    return this.rows.filter(row => {
      const matchesText = !q || [row.customer, row.phone, row.room].some(value => value.toLowerCase().includes(q));
      const matchesTab = this.activeTab === 'paid' ? row.status === 'paid' : this.activeTab !== 'debt' || row.status !== 'paid';
      const matchesStatus = this.statusFilter === 'all' || row.status === this.statusFilter;
      return matchesText && matchesStatus && matchesTab;
    });
  }

  statusLabel(status: PaymentStatus) {
    return { overdue: 'Quá hạn', unpaid: 'Chưa đóng', partial: 'Đã đóng 1 phần', paid: 'Đã thanh toán' }[status];
  }

  statusClass(status: PaymentStatus) {
    return {
      overdue: 'bg-rose-600 text-white',
      unpaid: 'bg-gray-100 text-slate-900',
      partial: 'bg-[#020214] text-white',
      paid: 'bg-green-100 text-green-700',
    }[status];
  }

  pay(row: { status: PaymentStatus; paid?: string; amount: string; customer: string }) {
    row.status = 'paid';
    row.paid = `Đã thanh toán: ${row.amount}`;
    const tab = this.tabs.find(item => item.key === 'debt');
    if (tab?.badge) tab.badge = Math.max(0, tab.badge - 1);
    this.show(`Đã ghi nhận thanh toán cho ${row.customer}`);
  }

  exportExcel() {
    const rows = [
      ['Khách hàng', 'SĐT', 'Phòng', 'Loại phí', 'Số tiền', 'Hạn đóng', 'Trạng thái'],
      ...this.filteredRows.map(row => [
        row.customer,
        row.phone,
        row.room,
        row.fees.join(' + '),
        row.amount,
        row.due,
        this.statusLabel(row.status),
      ]),
    ];
    this.downloadCsv(`thanh-toan-${new Date().toISOString().slice(0, 10)}.csv`, rows);
    this.show('Đã xuất danh sách thanh toán.');
  }

  private downloadCsv(filename: string, rows: string[][]) {
    const csv = rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  show(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
