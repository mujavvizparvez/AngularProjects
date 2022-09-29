import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { ICartDetails } from '../models/ICartDetails';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public carts:ICartDetails[]=[]
  // public cartItemList: any = [];
  // public productList = new BehaviorSubject<any>([]);

  // constructor() {}

  // getProducts() {
  //   return this.productList.asObservable();
  // }

  // setProduct(product: any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }

  // addToCart(product: any) {
  //   this.cartItemList.push(product);
  //   this.saveCartDataInLocalStorage();

  //   this.productList.next(this.cartItemList);
  //   this.getTotalPrice();
  //   console.log(this.cartItemList);
  // }

  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.cartItemList.map((a: any) => {
  //     grandTotal += a.total;
  //   });
  //   return grandTotal;
  // }

  // removeCartItem(product: any) {

  //   this.cartItemList.map((a: any, index: any) => {
  //     if (product.id === a.id) {
  //       this.cartItemList.splice(index, 1);
  //     }
  //   });

  // }

  // removeAllCart() {
  //   this.cartItemList = [];
  //  this.productList.next(this.cartItemList);
  // }

  // saveCartDataInLocalStorage() {
  //   let cartItemListJson = JSON.stringify(this.cartItemList);
  //   localStorage.setItem('cartItemList', cartItemListJson);
  // }
  // getCartDetailsFromLocalStorage() {
  //   let cartItemListJson = localStorage.getItem('cartItemList');
  //   if (cartItemListJson) {
  //     this.cartItemList = JSON.parse(cartItemListJson);
  //   }
  // }
  baseUrl = `https://e-commerceapp-fb599-default-rtdb.firebaseio.com/`;
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

  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.carts.map((a: any) => {
  //     grandTotal += a.total;
  //   });
  //   return grandTotal;
  // }
}