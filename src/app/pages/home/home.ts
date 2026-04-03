import { Component } from '@angular/core';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from "@angular/material/sidenav";
import { ProductBox } from "./components/product-box/product-box";
import { ProductsHeader } from "./components/products-header/products-header";
import { Filters } from "./components/filters/filters";
import { MatGridList } from "@angular/material/grid-list";
import { MatGridTile } from "@angular/material/grid-list";
import { CartService } from '../../services/cart';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store';
import { Subscription } from 'rxjs';

const ROWS_HEIGHT: {[id:number]: number} = { 1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-home',
  imports: [MatDrawerContainer, MatDrawer, MatDrawerContent, ProductsHeader, Filters, MatGridList, MatGridTile, ProductBox],
  templateUrl: './home.component.html'
})
export class Home {

  cols: number = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  products: Array<Product> | undefined = [];
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) {}

  ngOnInit() {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort).subscribe((_products) => {
      this.products = _products;
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
  
  onColumnsCountChange(colNum: number) : void {
    this.cols = colNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  
  onShowCategory(newCategory: string) : void {
    this.category = newCategory;
    console.log(this.category);
  }

  onAddToCart(product: Product) : void {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      product: product.imageUrl
    }, product);
    //console.log('Product added to cart:', product);
  }

}
