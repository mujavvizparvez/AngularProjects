import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartDetails } from '../models/ICartDetails';
import { IOrderDetails } from '../models/IOrderDetails';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: IOrderDetails[] = [];
  baseUrl = environment.firebaseBaseUrl;

  constructor(private http: HttpClient) {}

  addOrderDetails(
    order: IOrderDetails,
    userId: string
  ): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      `${this.baseUrl}orders/${userId}.json`,
      order
    );
  }

  getOrderDetails(userId: string): Observable<IOrderDetails[]> {
    return this.http
      .get<{ [id: string]: IOrderDetails[] }>(
        `${this.baseUrl}orders/${userId}.json`
      )
      .pipe(
        map((orders) => {
          let orderDetails: IOrderDetails[] = [];
          for (let order in orders) {
            orderDetails.push({
              id: order,
              ...orders[order],
            } as unknown as IOrderDetails);
          }
          return orderDetails;
        })
      );
  }

  getAllOrderDetails(): Observable<IOrderDetails[]> {
   // debugger;
    return this.http
      .get<{ [id: string]: IOrderDetails[] }>(
        `${this.baseUrl}orders.json`
      )
      .pipe(
        map((orders) => {
          let orderDetails: IOrderDetails[] = [];
          for (let order in orders) {
            orderDetails.push({
              id: order,
              ...orders[order],
            } as unknown as IOrderDetails);
          }
          return orderDetails;
        })
      );
  }

  getOrderDetailsById(id: string): Observable<IOrderDetails> {
    return this.http.get<IOrderDetails>(`${this.baseUrl}orders/${id}.json`);
  }

  updateOrderDetails(order: IOrderDetails, id: string, userId: string) {
    return this.http.put(`${this.baseUrl}orders/${userId}/${id}.json`, order);
  }
}
