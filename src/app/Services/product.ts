import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { ProductModel } from '../Model/product';

@Injectable({
  providedIn: 'root',
})

export class Product {
    private apiUrl = 'https://localhost:5115/api/Product';

    constructor() {}
    http = inject(HttpClient);

    getAllProducts() {
        return this.http.get<ProductModel[]>(`${this.apiUrl}/GetAllProducts`);
    }

    addProduct(product: ProductModel) {
        return this.http.post(`${this.apiUrl}/AddProduct`, product);
    }
}
