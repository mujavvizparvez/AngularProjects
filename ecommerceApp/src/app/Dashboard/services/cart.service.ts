import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { environment } from 'src/environments/environment';
import { ICartDetails } from '../models/ICartDetails';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public carts: ICartDetails[] = [];
  //public cartsl=new BehaviorSubject<any>([])
  public cartQuantity = new BehaviorSubject<number>(0);

  baseUrl = environment.firebaseBaseUrl;

  constructor(private http: HttpClient) {}
  getCarts(userId: string): Observable<ICartDetails[]> {
    return this.http
      .get<{ [id: string]: ICartDetails[] }>(
        `${this.baseUrl}carts/${userId}.json`
      )
      .pipe(
        map((carts) => {
          let cartDetails: ICartDetails[] = [];
          for (let cart in carts) {
            cartDetails.push({
              id: cart,
              ...carts[cart],
            } as unknown as ICartDetails);
          }
          return cartDetails;
        })
      );
  }

  addCart(cart: ICartDetails, userId: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      `${this.baseUrl}carts/${userId}.json`,
      cart
    );
  }

  getCartById(id: string): Observable<ICartDetails> {
    return this.http.get<ICartDetails>(`${this.baseUrl}carts/${id}.json`);
  }

  updateCart(cart: ICartDetails, id: string, userId: string) {
    return this.http.put(`${this.baseUrl}carts/${userId}/${id}.json`, cart);
  }

  deleteCart(id: string, userId: string) {
    return this.http.delete(`${this.baseUrl}carts/${userId}/${id}.json`);
  }
  deleteSelectedCart(userId: string, productId: string) {
    return this.http.delete(`${this.baseUrl}carts/${userId}/${productId}.json`);
  }

  deleteAllCart(userId: string) {
    this.carts = [];
    return this.http.delete(`${this.baseUrl}carts/${userId}.json`);
  }
  getCartQuantity(value:number) {
    return this.cartQuantity.next(value);
  }

  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.carts.map((a: any) => {
  //     grandTotal += a.total;
  //   });
  //   return grandTotal;
  // }
}