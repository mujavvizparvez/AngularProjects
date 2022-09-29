import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { ICartDetails } from 'src/app/Dashboard/models/ICartDetails';
import { CartService } from 'src/app/Dashboard/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  totalItem: number = 0;
  products: IProduct[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    let userDetails1 = this.authService.getUserDetailsFromLocalStorage();
    let userDetails = this.authService.userDetails;
    this.isLoggedIn = userDetails ? true : false;
    this.authService.loggedInEvent.subscribe((data) => {
      this.isLoggedIn = data;
    });
    debugger
    if (userDetails)
      this.cartService
        .getCarts(userDetails.userId)
        .subscribe((data) => (this.totalItem = data.length));
  }
  
  ngOnChanges() {
    
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  onSearchProduct() {}
}
