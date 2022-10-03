import { Component, OnInit } from '@angular/core';
import { IUserDetais } from '../../../Auth/models/IUserDeatails';
import { AuthService } from '../../../Auth/services/auth.service';
import { ICartDetails } from '../../../Dashboard/models/ICartDetails';
import { IUser } from '../../../Dashboard/models/IUser';
import { CartService } from '../../../Dashboard/services/cart.service';
import { UserService } from '../../../Dashboard/services/users.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css'],
})
export class UserPaymentComponent implements OnInit {
  carts: ICartDetails[] = [];
  userId: string = '';
  id: string = '';
  grandTotal: number = 0;
  paymentOption: string = '';
  paymentOPtionSelect: string = '';
  showRadioButton = false;
  isDisabled: boolean = false;
  user?: IUser = {
    fullName: '',
    email: '',
    address: '',
    pinCode: 0,
    dateOfBirth: new Date(),
    state: '',
    mobileNumber: 0,
    gender: '',
    userId: '',
    password: '',
  };
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let userDetails = this.authService.userDetails;
    if (userDetails) {
      this.userId = userDetails.userId;
      this.cartService.getCarts(this.userId).subscribe((data) => {
        this.carts = data;
      });
      this.userService.getUser().subscribe((data) => {
        this.user = data.find((s) => s.userId == this.userId);
      });
    }
  }

  onQtyIncrease(cart: ICartDetails) {
    cart.quantity = cart.quantity + 1;
    this.cartService
      .updateCart(cart, cart.id ?? '', this.userId)
      .subscribe((data) => {});
  }

  onQtyDecrease(cart: ICartDetails) {
    cart.quantity = cart.quantity > 1 ? cart.quantity - 1 : 1;
    this.cartService
      .updateCart(cart, cart.id ?? '', this.userId)
      .subscribe((data) => {});
  }

  onDeleteCart(id?: string) {
    if (confirm('Are you sure you want to delete cart')) {
      this.cartService.deleteCart(id ?? '', this.userId).subscribe((data) => {
        this.cartService
          .getCarts(this.userId)
          .subscribe((carts: ICartDetails[]) => {
            this.carts = carts;
          });
      });
    } else {
      return;
    }
  }

  getGrandTotal(carts: ICartDetails[]) {
    let finalTotal = 0;
    carts.forEach((item) => {
      let total = item.quantity * item.price;
      finalTotal += total;
    });
    return finalTotal;
  }

  onShowRadioBtn() {
    this.showRadioButton = true;
  }

  onPaymentOptionChange(event: any) {
    this.paymentOption = event.target.value;
    console.log(this.paymentOption);
  }
  onPaymentOptionSelect(event:any) {
    this.paymentOPtionSelect = event.target.value;
  }
  onEnableId() {}
}
