import { Component, input, ElementRef, effect, inject } from '@angular/core';
import * as Lucide from 'lucide';
import { createElement } from 'lucide';

@Component({
  selector: 'app-lucide-icon',
  template: '',
  styles: [' :host { display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; } '],
  standalone: true,
})
export class LucideIconComponent {
  name = input.required<string>();
  size = input<number>(20);
  color = input<string>('currentColor');

  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      const iconName = this.name();
      const pascalName = iconName.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());
      const iconArray = (Lucide as any)[pascalName];
      if (iconArray && Array.isArray(iconArray)) {
        const svgEl = createElement(iconArray, {
          width: this.size(),
          height: this.size(),
          color: this.color(),
          strokeWidth: 2,
        });
        this.el.nativeElement.innerHTML = '';
        this.el.nativeElement.appendChild(svgEl);
      }
    });
  }
}
