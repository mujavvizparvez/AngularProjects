import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartDetails } from '../models/ICartDetails';
import { IOrderDetails, IUserOrderDetails } from '../models/IOrderDetails';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: IUserOrderDetails[] = [];
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

  getAllOrderDetails(): Observable<IUserOrderDetails[]> {
    return this.http
      .get<{ [id: string]: IUserOrderDetails[] }>(`${this.baseUrl}orders.json`)
      .pipe(
        map((userOrders) => {
          let userOrderDetails: IUserOrderDetails[] = [];
          for (let orders in userOrders) {
            let orderDetails: IOrderDetails[] = [];
            for (let item in userOrders[orders]) {
              orderDetails.push({
                id: item,
                ...userOrders[orders][item],
              } as unknown as IOrderDetails);
            }
            userOrderDetails.push({
              userId: orders,
              orders: orderDetails,
            });
          }
          return userOrderDetails;
        })
      );
  }

  getOrderDetailsById(id: string): Observable<IUserOrderDetails> {
    return this.http.get<IUserOrderDetails>(`${this.baseUrl}orders/${id}.json`);
  }

  updateOrderDetails(order: IOrderDetails, id: string, userId: string) {
    return this.http.put(`${this.baseUrl}orders/${userId}/${id}.json`, order);
  }
}

// <ul>
                                                              
//     <li  (click)="changeColor[i]=!changeColor[i]"
// // we are toggling the background
// // colour on click event handler
//    [style.background-color] = "changeColor[i]  ? 'red' : 'green'"
//    *ngFor="let item of list ; let i = index">
//       {{item.name}}
//     </li>
    
// </ul>


// import { Component } from '@angular/core';

// @Component({
//   selector: 'my-app',
//   templateUrl: './app.comp659/nt.css'],
// })
// export class AppComponent {
//   changeColor = [false, false, false];

//   list = [
//     { name: 'GeeksForGeeks' },
//     { name: 'Google' },
//     { name: 'HackerRank' },
//   ];
// }*