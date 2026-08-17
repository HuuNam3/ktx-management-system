import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';

interface DocumentTemplate {
  title: string;
  icon: string;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  standalone: true,
  imports: [FormsModule, PageHeaderComponent, LucideIconComponent],
})
export class PrintPage {
  message = '';
  selectedDoc: DocumentTemplate | null = null;
  printForm = {
    fullName: 'Nguyễn Văn A',
    cccd: '079123456789',
    room: 'A301',
    amount: '1.250.000đ',
    note: 'Xác nhận phục vụ công tác quản lý ký túc xá.',
  };

  documents: DocumentTemplate[] = [
    { title: 'Giấy xác nhận sinh viên KTX', icon: 'file-text', color: '#2563EB', bg: '#DBEAFE' },
    { title: 'Giấy xác nhận tạm trú', icon: 'file-text', color: '#059669', bg: '#DCFCE7' },
    { title: 'Giấy xác nhận miễn giảm 238', icon: 'file-text', color: '#9333EA', bg: '#F3E8FF' },
    { title: 'Hóa đơn tiền phòng', icon: 'file-text', color: '#D97706', bg: '#FEF3C7' },
    { title: 'Biên lai thu tiền', icon: 'file-text', color: '#EA580C', bg: '#FFEDD5' },
    { title: 'Hợp đồng lưu trú', icon: 'file-text', color: '#DC2626', bg: '#FEE2E2' },
  ];

  open(doc: DocumentTemplate) {
    this.selectedDoc = doc;
  }

  close() {
    this.selectedDoc = null;
  }

  get previewText() {
    if (!this.selectedDoc) return '';
    return [
      'KTX TÂY ĐÔ',
      this.selectedDoc.title.toUpperCase(),
      '',
      `Họ tên: ${this.printForm.fullName}`,
      `CCCD/Mã SV: ${this.printForm.cccd}`,
      `Phòng: ${this.printForm.room}`,
      `Số tiền/Ghi chú phí: ${this.printForm.amount}`,
      `Nội dung: ${this.printForm.note}`,
      '',
      `Ngày lập: ${new Date().toLocaleDateString('vi-VN')}`,
      'Người lập phiếu: Nguyễn Văn A',
    ].join('\n');
  }

  printSelected() {
    if (!this.selectedDoc) return;
    const win = window.open('', '_blank', 'width=860,height=720');
    if (!win) {
      this.show('Trình duyệt đang chặn cửa sổ in.');
      return;
    }
    win.document.write(this.documentHtml());
    win.document.close();
    win.focus();
    win.print();
  }

  downloadSelected() {
    if (!this.selectedDoc) return;
    const blob = new Blob([this.documentHtml()], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${this.slug(this.selectedDoc.title)}.html`;
    anchor.click();
    URL.revokeObjectURL(url);
    this.show('Đã tải giấy tờ.');
  }

  private documentHtml() {
    const title = this.selectedDoc?.title || 'Giấy tờ';
    const now = new Date();
    return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>${this.escape(title)}</title>
  <style>
    body { font-family: "Times New Roman", serif; margin: 48px; color: #111827; }
    .center { text-align: center; }
    h1 { font-size: 22px; margin: 28px 0; text-transform: uppercase; }
    .row { margin: 12px 0; font-size: 17px; }
    .sign { margin-top: 56px; display: flex; justify-content: flex-end; text-align: center; }
  </style>
</head>
<body>
  <div class="center"><strong>KTX TÂY ĐÔ</strong><br>Quản lý ký túc xá</div>
  <h1 class="center">${this.escape(title)}</h1>
  <div class="row"><strong>Họ tên:</strong> ${this.escape(this.printForm.fullName)}</div>
  <div class="row"><strong>CCCD/Mã SV:</strong> ${this.escape(this.printForm.cccd)}</div>
  <div class="row"><strong>Phòng:</strong> ${this.escape(this.printForm.room)}</div>
  <div class="row"><strong>Số tiền/Ghi chú phí:</strong> ${this.escape(this.printForm.amount)}</div>
  <div class="row"><strong>Nội dung:</strong> ${this.escape(this.printForm.note)}</div>
  <div class="sign"><div>Ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}<br><strong>Người lập phiếu</strong><br><br><br>Nguyễn Văn A</div></div>
</body>
</html>`;
  }

  private escape(value: string) {
    return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));
  }

  private slug(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  }

  private show(text: string) {
    this.message = text;
    window.setTimeout(() => this.message = '', 1800);
  }
}
