import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from 'src/app/Dashboard/models/IUser';
import { UserService } from 'src/app/Dashboard/services/users.service';
import { IUserDetais } from '../models/IUserDeatails';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAdmin = false;
  adminEmail = 'shaikh1@gmail.com';
  adminPassword = '123567';
  userDetails: IUserDetais | null = null;
  loggedInEvent = new EventEmitter<boolean>();
  // apiKey = `AIzaSyAwqNYRnLOnXbLXrOjRwtnSXYS9C4VvedY`;
  apiKey = `AIzaSyBHolW4m54wiNw3U4jtmNX2FjSQ7krNYJM`;

  constructor(private http: HttpClient, private userService: UserService) {}

  login(email: string, password: string): Observable<IUserDetais> {
    let userId: string = '';
    this.userService.getUser().subscribe((data: IUser[]) => {
      userId = data.find((s) => s.email == email)?.userId ?? '';
    });
    return this.http
      .post<IUserDetais>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        tap((data) => {
          this.userDetails = data;
          this.userDetails.userId = userId;
          this.saveDataInLocalStorage();
          if (email == this.adminEmail && password == this.adminPassword) {
            this.isAdmin = true;
          }
        })
      );
  }

  register(email: string, password: string) {
    //add user service
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      { email, password, returnSecureToken: true }
    );
  }
  saveDataInLocalStorage() {
    let userDetailsJson = JSON.stringify(this.userDetails);
    localStorage.setItem('userDetails', userDetailsJson);
  }
  getUserDetailsFromLocalStorage() {
    let userDetailsJson = localStorage.getItem('userDetails');
    if (userDetailsJson) {
      this.userDetails = JSON.parse(userDetailsJson);
      this.loggedInEvent.emit(true);
    }
  }
  logout() {
    localStorage.removeItem('userDetails');
    this.userDetails = null;
    this.loggedInEvent.emit(false);
  }
}
