import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-filters',
  imports: [MatExpansionModule, MatListModule, CommonModule],
  templateUrl: './filters.component.html',
  styles: ``,
})
export class Filters {

  @Output() showCategory = new EventEmitter<string>();
  categories = ['drugs','electronics','clothing'];
  brands = ['','','',''];
  colors = ['','','',''];
  priceRanges = ['','','',''];

  onShowCategory(category: string) : void {
    this.showCategory.emit(category);
    console.log(category);
  }

}
