import { Component, input, output } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-box',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CurrencyPipe, TitleCasePipe],
  templateUrl: './product-box.component.html',
})
export class ProductBox {
  fullWidthMode = input(false);
  product = input<Product>();
  addToCart = output<Product>();

  onAddToCart(): void {
    const p = this.product();
    if (p) this.addToCart.emit(p);
  }
}
