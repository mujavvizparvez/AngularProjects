import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = `https://e-commerceapp-fb599-default-rtdb.firebaseio.com/`;
  constructor(private http: HttpClient) {}

  addUser(user: IUser): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.baseUrl}users.json`, user);
  }

  getUser():Observable<IUser[]> {
    return this.http
      .get<{ [id: string]: IUser }[]>(`${this.baseUrl}users.json`)
      .pipe(
        map((users) => {
          let userDetail: IUser[] = [];
          for (let user in users) {
            userDetail.push({
              user,
              ...users[user],
            } as unknown as IUser);
          }
          return userDetail;
        })
      );
  }

  getUserById(id:string):Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}users/${id}.json`);
  }

  updateUser(id:string,user:IUser) {
    return this.http.put(`${this.baseUrl}users/${id}.json`,user)
  }
  deleteUser(id:string) {
     return this.http.delete(`${this.baseUrl}users/${id}.json`)
   }
}