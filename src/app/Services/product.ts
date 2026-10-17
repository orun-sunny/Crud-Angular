import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../Model/product';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private apiUrl = 'http://localhost:5115/api';
  private http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<ProductModel[]>(`${this.apiUrl}/Products`);
  }

  addProduct(product: ProductModel) {
    return this.http.post<ProductModel>(`${this.apiUrl}/Product`, product);
  }
}
