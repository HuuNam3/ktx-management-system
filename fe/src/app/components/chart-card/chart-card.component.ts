import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  standalone: true,
})
export class ChartCardComponent {
  title = input.required<string>();
  type = input<'line' | 'donut'>('line');
  data = input<number[]>([]);
  labels = input<string[]>([]);
  colors = input<string[]>([]);
  showExport = input(false);

  linePoints = computed(() => {
    const d = this.data();
    if (!d.length) return '';
    const w = 300, h = 100, pad = 10;
    const max = Math.max(...d, 1);
    const min = Math.min(...d, 0);
    const range = max - min || 1;
    return d.map((v, i) => {
      const x = pad + (i / (d.length - 1 || 1)) * (w - 2 * pad);
      const y = h - pad - ((v - min) / range) * (h - 2 * pad);
      return `${x},${y}`;
    }).join(' ');
  });

  areaPoints = computed(() => {
    const d = this.data();
    if (!d.length) return '';
    const w = 300, h = 100, pad = 10;
    const max = Math.max(...d, 1);
    const min = Math.min(...d, 0);
    const range = max - min || 1;
    const pts = d.map((v, i) => {
      const x = pad + (i / (d.length - 1 || 1)) * (w - 2 * pad);
      const y = h - pad - ((v - min) / range) * (h - 2 * pad);
      return `${x},${y}`;
    });
    const bottomY = h - pad;
    return `${pad},${bottomY} ${pts.join(' ')} ${w - pad},${bottomY}`;
  });

  totalValue = computed(() => {
    return this.data().reduce((a, b) => a + b, 0);
  });

  donutSegments = computed(() => {
    const d = this.data();
    const cols = this.colors();
    const total = this.totalValue() || 1;
    const circumference = 2 * Math.PI * 15.9;
    let offset = 0;
    return d.map((v, i) => {
      const length = (v / total) * circumference;
      const seg = {
        dash: `${length} ${circumference - length}`,
        offset: -90 + (offset / circumference) * 360,
        color: (cols && cols[i]) || 'var(--primary)'
      };
      offset += length;
      return seg;
    });
  });

  legendItems = computed(() => {
    return this.labels().map((label, i) => ({
      label,
      value: this.data()[i] || 0,
      color: (this.colors() && this.colors()[i]) || 'var(--primary)',
    }));
  });
}
