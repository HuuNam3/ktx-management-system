import { Component, output, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, searchSharp } from 'ionicons/icons';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  standalone: true,
  imports: [IonIcon],
})
export class SearchCardComponent {
  valueChange = output<string>();
  lastQuery = signal('');

  constructor() {
    addIcons({ searchOutline, searchSharp });
  }

  onInput(value: string) {
    this.lastQuery.set(value);
    this.valueChange.emit(value);
  }
}
