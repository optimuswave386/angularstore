import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Header } from './components/header/header';
import { CartService } from './services/cart';
import { StoreService } from './services/store';
import { StateStorageService } from './services/statestorage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatIconModule, Header],
  providers: [CartService, StoreService, StateStorageService],
  template: `
    <div class="min-h-dvh flex flex-col">
      <app-header [cart]="cart()" />
      <main class="flex-1">
        <router-outlet />
      </main>
      <footer class="border-t border-subtle bg-surface-low">
        <div class="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <a routerLink="/" class="flex items-center gap-2 font-medium" style="color: var(--mat-sys-on-surface)">
            <mat-icon>storefront</mat-icon> Store
          </a>
          <span>© {{ year-1 }}-{{ year }}, Store. All rights reserved.</span>
        </div>
      </footer>
    </div>
  `,
  styles: [':host { display: block; }'],
})
export class App {
  private cartService = inject(CartService);
  cart = toSignal(this.cartService.cart, { requireSync: true });
  year = new Date().getFullYear();
}
