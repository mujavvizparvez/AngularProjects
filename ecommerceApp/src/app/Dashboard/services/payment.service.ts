import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserPayment } from '../models/IUserPayment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl = `https://e-commerceapp-fb599-default-rtdb.firebaseio.com/`;

    constructor(private http: HttpClient) { }
    addPaymentDetails(payment:IUserPayment,userId:string):Observable<{id:string}> {
        return this.http.post<{id:string}>(`${this.baseUrl}payments/${userId}.json`,payment)
    }

  }

