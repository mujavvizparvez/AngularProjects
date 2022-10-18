import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWishlist } from '../models/IWishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  public wishlists: IWishlist[] = [];
  baseUrl = environment.firebaseBaseUrl;

  constructor(private http: HttpClient) {}

  addWishlist(wishlist: IWishlist, userId: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      `${this.baseUrl}orders/${userId}.json`,
      wishlist
    );
  }

  getWishlist(userId: string): Observable<IWishlist[]> {
    return this.http
      .get<{ [id: string]: IWishlist[] }>(
        `${this.baseUrl}wishlists/${userId}.json`
      )
      .pipe(
        map((lists) => {
          let listDetails: IWishlist[] = [];
          for (let list in lists) {
            listDetails.push({
              id: list,
              ...lists[list],
            } as unknown as IWishlist);
          }
          return listDetails;
        })
      );
  }
}
