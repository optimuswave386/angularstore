import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    CurrencyPipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  templateUrl: './header.component.html',
})
export class Header {
  private cartService = inject(CartService);

  cart = input<Cart>({ items: [] });

  itemsQuantity = computed(() =>
    this.cart().items.reduce((total, item) => total + item.quantity, 0),
  );
  total = computed(() => this.cartService.getTotal(this.cart().items));

  onClearCart() {
    this.cartService.clearCart();
  }
}
