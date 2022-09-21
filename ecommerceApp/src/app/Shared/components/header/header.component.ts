import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { CartService } from 'src/app/Dashboard/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  totalItem: number = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.userDetails ? true : false;
    this.authService.loggedInEvent.subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.cartService.getProducts().subscribe((data) => {
      this.totalItem = data.length;
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
