import { Component, input, output } from '@angular/core';

export interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: true,
})
export class FilterBarComponent {
  options = input.required<FilterOption[]>();
  selected = input<string>('all');
  selectedChange = output<string>();

  select(value: string) {
    this.selectedChange.emit(value);
  }
}
