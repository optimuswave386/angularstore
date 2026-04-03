import { Component } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule} from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { CurrencyPipe, NgClass } from '@angular/common'
import { CdkTableModule } from '@angular/cdk/table'; // or MatTableModule
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, MatCardModule, CdkTableModule, MatTableModule, MatButtonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
})

export class CartComponent {

  cart: Cart = { items: [{
    id: 1,
    product: 'https://placehold.co/150',
    name: 'Product 1 Name',
    price: 10,
    quantity: 2
  },{
    id: 2,
    product: 'https://placehold.co/150',
    name: 'Product 2 Name',
    price: 20,
    quantity: 2
  }] };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  constructor(private cartService: CartService) {}

  ngOnInit():void { 
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotalPrice(): number {
    return this.cartService.getTotal(this.cart.items);
  }
  
  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item);
  } 

}
