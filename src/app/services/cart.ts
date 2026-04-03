import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private __snackBar: MatSnackBar) {}

  // get() {
  //   return this.cart.asObservable();
  // }

  // set(cart: Cart) {
  //   this.cart.next(cart);
  // }

  addToCart(item: CartItem, product: Product) : void {

    const items = [...this.cart.value.items];
    const itemInCart = items.find((__item) => __item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.__snackBar.open(`${item.name} added to cart!`, 'Close', { duration: 2000 });
    console.log('Cart updated:', this.cart.value);
    
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value;
    const updatedItems = currentCart.items.filter((item) => item.id !== productId);
    this.cart.next({ items: updatedItems });
    this.__snackBar.open(`Product removed from cart!`, 'Close', { duration: 2000 });
  }

  clearCart() {
    this.cart.next({ items: [] });
    this.__snackBar.open(`Cart cleared!`, 'Close', { duration: 2000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  decreaseQuantity(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((__item) => __item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity -= 1;
      if (itemInCart.quantity === 0) {
        this.removeFromCart(item.id);
      } else {
        this.cart.next({ items });
      }
    }
  }

  increaseQuantity(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((__item) => __item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
      this.cart.next({ items });
    }
  }

  removeItem(item: CartItem): void {
    const updatedItems = this.cart.value.items.filter(i => i.id !== item.id);
    this.cart.next({ items: updatedItems });
    this.__snackBar.open(`${item.name} removed from cart!`, 'Close', { duration: 2000 });
  }

}
