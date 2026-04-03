import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home"
import { CommonModule } from '@angular/common';
import { Header } from "./components/header/header"; 
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
import { CartService } from './services/cart';
import { Cart, CartItem } from './models/cart.model';
import { StateStorageService } from './services/statestorage';
import { StoreService } from './services/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    //Home,
    CommonModule,
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
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [CartService, StoreService, StateStorageService],
  template: `
  <app-header [cart]="cart"></app-header>
  <!-- <app-home></app-home> -->
  <router-outlet>
  `,
  styles: [],
})
export class App implements OnInit {
  protected readonly title = signal('store');
  cart: Cart = ({ items: [] });

  constructor(private cartService: CartService) {}
  ngOnInit() {
      this.cartService.cart.subscribe(_cart => {
        this.cart = _cart;
      });
  }
}
