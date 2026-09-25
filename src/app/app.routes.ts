import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: Landing, pathMatch: 'full', title: 'Store' },
  { path: 'home', component: Home, title: 'Shop · Store' },
  { path: 'cart', component: CartComponent, title: 'Cart · Store' },
  { path: '**', redirectTo: '' },
];
