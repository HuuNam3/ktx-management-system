import { Component, input, output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, searchSharp } from 'ionicons/icons';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  standalone: true,
  imports: [IonIcon],
})
export class SearchInputComponent {
  placeholder = input('Tìm kiếm...');
  valueChange = output<string>();

  constructor() {
    addIcons({ searchOutline, searchSharp });
  }
}
