import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatAnchor } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-products-header',
  imports: [MatCardModule, MatAnchor, MatMenuModule, MatIcon],
  templateUrl: './products-header.component.html',
})
export class ProductsHeader {

  @Output() columnsCountChange = new EventEmitter<number>();
  
  sort: string = 'desc';
  itemsShowCount: number = 12;

  onSortUpdated(newSort: string) : void {
    this.sort = newSort;
  }

  onItemsUpdated(count: number) : void {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colNum: number) : void {  
    this.columnsCountChange.emit(colNum);
  }

}
