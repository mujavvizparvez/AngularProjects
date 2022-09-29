import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/services/auth.service';
import { ICartDetails } from '../Dashboard/models/ICartDetails';
import { CartService } from '../Dashboard/services/cart.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css'],
})
export class UserPaymentComponent implements OnInit {
  carts: ICartDetails[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let userDetails = this.authService.userDetails;
    if (userDetails)
      this.cartService.getCarts(userDetails?.userId).subscribe((data) => {
        this.carts = data;
      });
  }
}
