import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com/'; // Replace with your actual API base URL
const PRODUCTS_BASE_URL = 'http://localhost:5078/api';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  
  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get(`${PRODUCTS_BASE_URL}/products`);
  }

  getStoreItems() {
    return this.httpClient.get(`${STORE_BASE_URL}/items`);
  }

  getStoreItemById(id: number) {
    return this.httpClient.get(`${STORE_BASE_URL}/items/${id}`);
  }

  purchaseItem(itemId: number, quantity: number) {
    return this.httpClient.post(`${STORE_BASE_URL}/purchase`, { itemId, quantity });
  }

  getAllProducts(limit='12', sort="desc") : Observable<Array<Product>> {
    //return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`);
    return this.httpClient.get<Array<Product>>(`${PRODUCTS_BASE_URL}/products`);
  }

}
