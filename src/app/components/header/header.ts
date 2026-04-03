import { Component, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatSidenavModule} from '@angular/material/sidenav'
import { MatGridListModule} from '@angular/material/grid-list'
import { MatMenuModule} from '@angular/material/menu'
import { MatCardModule} from '@angular/material/card'
import { MatIconModule} from '@angular/material/icon'
import { MatExpansionModule} from '@angular/material/expansion'
import { MatListModule} from '@angular/material/list'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatTableModule} from '@angular/material/table'
import { MatBadgeModule} from '@angular/material/badge'
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { CurrencyPipe } from '@angular/common'
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    CurrencyPipe, 
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule, 
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  templateUrl: './header.component.html',
  styles: ``,
})
export class Header {

  private isMenuOpen = false;
  private isCartOpen = false;
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  constructor(private cartService: CartService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  
  onClearCart() {
    this.cartService.clearCart();
  }
  
}
