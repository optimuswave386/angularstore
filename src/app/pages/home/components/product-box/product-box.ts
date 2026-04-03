import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { CurrencyPipe, NgClass } from '@angular/common'
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-box',
  imports: [MatCardModule, MatIcon, CurrencyPipe, NgClass],
  templateUrl: './product-box.component.html'
})
export class ProductBox {
  
  constructor() {}

  @Input() fullWidthMode: boolean = false;
  @Input() product: Product | undefined;
  // product: Product | undefined = {
  //   id: 1,
  //   title: 'Sample Product',
  //   price: 150,
  //   category: 'Category',
  //   description: 'This is a sample product description.',
  //   imageUrl: 'https://placehold.co/150'
  // };

  @Output() addToCart = new EventEmitter<Product>();
  onAddToCart(): void {
    // Emit an event to add the product to the cart
    this.addToCart.emit(this.product);
  }

}
