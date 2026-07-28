import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  standalone: true,
})
export class ChartCardComponent {
  title = input.required<string>();
  description = input<string>('');
  type = input<'line' | 'donut'>('line');
  data = input<number[]>([]);
  labels = input<string[]>([]);
  colors = input<string[]>([]);
  showExport = input(false);

  chartWidth = 380;
  chartHeight = 150;
  padLeft = 35;
  padRight = 30;
  padTop = 15;
  padBottom = 25;
  tickCount = 4;

  chartW = () => this.chartWidth - this.padLeft - this.padRight;
  chartH = () => this.chartHeight - this.padTop - this.padBottom;

  private chartProps = computed(() => {
    const d = this.data();
    if (!d.length) return { max: 0, min: 0, range: 1, ticks: [] as number[] };
    const max = Math.max(...d, 1);
    const min = Math.min(...d, 0);
    const range = max - min || 1;
    const step = range / 4;
    const ticks = [0, 1, 2, 3, 4].map(i => +(min + step * i).toFixed(1));
    return { max, min, range, ticks };
  });

  linePoints = computed(() => {
    const d = this.data();
    if (!d.length) return '';
    const { max, min, range } = this.chartProps();
    const cw = this.chartW();
    const ch = this.chartH();
    return d.map((v, i) => {
      const x = this.padLeft + (i / (d.length - 1 || 1)) * cw;
      const y = this.padTop + ch - ((v - min) / range) * ch;
      return `${x},${y}`;
    }).join(' ');
  });

  areaPoints = computed(() => {
    const d = this.data();
    if (!d.length) return '';
    const { max, min, range } = this.chartProps();
    const cw = this.chartW();
    const ch = this.chartH();
    const pts = d.map((v, i) => {
      const x = this.padLeft + (i / (d.length - 1 || 1)) * cw;
      const y = this.padTop + ch - ((v - min) / range) * ch;
      return `${x},${y}`;
    });
    const bottomY = this.padTop + ch;
    return `${this.padLeft},${bottomY} ${pts.join(' ')} ${this.padLeft + cw},${bottomY}`;
  });

  gridLines = computed(() => {
    const { ticks } = this.chartProps();
    const cw = this.chartW();
    const ch = this.chartH();
    const { max, min, range } = this.chartProps();
    return ticks.map(t => {
      const y = this.padTop + ch - ((t - min) / range) * ch;
      return { y, label: t };
    });
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
