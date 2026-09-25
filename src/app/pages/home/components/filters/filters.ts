import { Component, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filters',
  imports: [MatButtonModule, TitleCasePipe],
  templateUrl: './filters.component.html',
})
export class Filters {
  categories = input<string[]>([]);
  selected = input<string>('');
  showCategory = output<string>();
}
