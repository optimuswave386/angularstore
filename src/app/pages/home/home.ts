import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductBox } from './components/product-box/product-box';
import { ProductsHeader, SortOption } from './components/products-header/products-header';
import { Filters } from './components/filters/filters';
import { CartService } from '../../services/cart';
import { StoreService } from '../../services/store';
import { Product } from '../../models/product.model';

const GRID_CLASSES: Record<number, string> = {
  1: 'grid-cols-1',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

@Component({
  selector: 'app-home',
  imports: [ProductsHeader, Filters, ProductBox, MatProgressBarModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
})
export class Home {
  private cartService = inject(CartService);
  private storeService = inject(StoreService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  products = signal<Product[]>([]);
  loading = signal(true);
  failed = signal(false);

  cols = signal(3);
  sort = signal<SortOption>('default');
  count = signal(12);
  category = signal('');

  categories = computed(() =>
    [...new Set(this.products().map((p) => p.category).filter(Boolean))].sort(),
  );

  filtered = computed(() => {
    const cat = this.category().toLowerCase();
    let list = cat ? this.products().filter((p) => p.category?.toLowerCase() === cat) : [...this.products()];
    if (this.sort() === 'asc') list = list.sort((a, b) => a.price - b.price);
    if (this.sort() === 'desc') list = list.sort((a, b) => b.price - a.price);
    return list;
  });
  visible = computed(() => this.filtered().slice(0, this.count()));
  gridClass = computed(() => GRID_CLASSES[this.cols()] ?? GRID_CLASSES[3]);

  ngOnInit() {
    // Lets the landing page deep-link to a category: /home?category=electronics
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => this.category.set(params.get('category') ?? ''));
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.failed.set(false);
    this.storeService
      .getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products ?? []);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Could not load products', err);
          this.products.set([]);
          this.failed.set(true);
          this.loading.set(false);
        },
      });
  }

  onShowCategory(category: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: category || null },
      queryParamsHandling: 'merge',
    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(
      {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        product: product.imageUrl,
      },
      product,
    );
  }
}
