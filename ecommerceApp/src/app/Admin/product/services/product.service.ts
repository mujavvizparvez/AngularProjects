import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = `https://e-commerceapp-fb599-default-rtdb.firebaseio.com/`;
  constructor(private http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<{ [id: string]: IProduct }[]>(`${this.baseUrl}products.json`)
      .pipe(
        map((products) => {
          let formattedProducts: IProduct[] = [];
          for (let id in products) {
            formattedProducts.push({
              id,
              ...products[id],
            } as IProduct);
          }
          return formattedProducts;
        })
      );
  }
  addProduct(product: IProduct): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${this.baseUrl}products.json`,
      product
    );
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}.json`);
  }
  updateProduct(product: IProduct, id: string) {
    return this.http.put(`${this.baseUrl}products/${id}.json`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}products/${id}.json`);
  }
}