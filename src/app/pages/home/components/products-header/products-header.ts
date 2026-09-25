import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

export type SortOption = 'default' | 'asc' | 'desc';

@Component({
  selector: 'app-products-header',
  imports: [MatButtonModule, MatButtonToggleModule, MatMenuModule, MatIconModule],
  templateUrl: './products-header.component.html',
})
export class ProductsHeader {
  total = input(0);
  shown = input(0);
  cols = input(3);
  sort = input<SortOption>('default');
  count = input(12);

  columnsCountChange = output<number>();
  sortChange = output<SortOption>();
  countChange = output<number>();

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Featured' },
    { value: 'asc', label: 'Price: low to high' },
    { value: 'desc', label: 'Price: high to low' },
  ];
  countOptions = [12, 24, 36];

  sortLabel = computed(() => this.sortOptions.find((o) => o.value === this.sort())?.label ?? 'Featured');
}
