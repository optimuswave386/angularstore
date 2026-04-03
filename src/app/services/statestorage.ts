import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StateStorageService {
  
  cart = new BehaviorSubject<Cart>({ items: [] });
  
  constructor(private __snackBar: MatSnackBar) {}
  
  saveState(key: string, data: any, item: CartItem): void {
    //localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`cart-item-${item.id}`, JSON.stringify(item));
    this.__snackBar.open(`${item.name} added to cart!`, 'Close', { duration: 2000 });
  }

  loadState(key: string, item: CartItem): any {
    //const storedData = localStorage.getItem(key);
    const storedData = localStorage.getItem(`cart-item-${item.id}`);
    return storedData ? JSON.parse(storedData) : null;
  }
  
}
