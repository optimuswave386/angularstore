import { Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT, CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart';
import { StoreService } from '../../services/store';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatDividerModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private cartService = inject(CartService);
  private storeService = inject(StoreService);
  private snackBar = inject(MatSnackBar);
  private document = inject(DOCUMENT);

  cart = toSignal(this.cartService.cart, { requireSync: true });
  total = computed(() => this.cartService.getTotal(this.cart().items));
  itemCount = computed(() => this.cart().items.reduce((n, i) => n + i.quantity, 0));
  checkingOut = signal(false);

  clearCart(): void { this.cartService.clearCart(); }
  removeItem(item: CartItem): void { this.cartService.removeItem(item); }
  decreaseQuantity(item: CartItem): void { this.cartService.decreaseQuantity(item); }
  increaseQuantity(item: CartItem): void { this.cartService.increaseQuantity(item); }

  onCheckout(): void {
    this.checkingOut.set(true);
    this.storeService.checkout(this.cart().items).subscribe({
      next: (session) => {
        if (session?.url) {
          this.document.location.href = session.url;
        } else {
          this.checkingOut.set(false);
          this.snackBar.open('Checkout could not be started.', 'Close', { duration: 4000 });
        }
      },
      error: (err) => {
        console.error('Checkout failed', err);
        this.checkingOut.set(false);
        this.snackBar.open('Checkout is unavailable right now. Please try again.', 'Close', { duration: 4000 });
      },
    });
  }
}
