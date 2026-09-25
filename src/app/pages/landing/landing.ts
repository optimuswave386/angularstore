import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface QuickLink {
  name: string;
  description: string;
  icon: string;
  link: string;
  query?: Record<string, string>;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './landing.component.html',
})
export class Landing {
  // Edit these to change the tiles on the front page.
  // `query.category` pre-selects a category filter on the shop page.
  quickLinks: QuickLink[] = [
    { name: 'All products', description: 'Browse the full catalogue', icon: 'grid_view', link: '/home' },
    { name: 'Electronics', description: 'Gadgets and gear', icon: 'devices', link: '/home', query: { category: 'electronics' } },
    { name: 'Clothing', description: 'Everyday essentials', icon: 'checkroom', link: '/home', query: { category: 'clothing' } },
    { name: 'Your cart', description: 'Review and check out', icon: 'shopping_cart', link: '/cart' },
  ];

  features = [
    { icon: 'local_shipping', title: 'Free shipping', text: 'Standard delivery is free and arrives in 5–7 business days.' },
    { icon: 'bolt', title: 'Next-day option', text: 'Need it fast? Choose next-day air at checkout for $15.' },
    { icon: 'verified_user', title: 'Secure checkout', text: 'Payments are processed safely by Stripe.' },
  ];
}
