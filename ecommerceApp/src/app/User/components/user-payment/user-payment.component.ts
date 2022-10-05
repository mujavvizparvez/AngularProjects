import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryStatus } from 'src/app/Dashboard/models/DeliveryStatus';
import { IOrderDetails } from 'src/app/Dashboard/models/IOrderDetails';
import { IUserPayment } from 'src/app/Dashboard/models/IUserPayment';
import { OrderService } from 'src/app/Dashboard/services/order.service';
import { PaymentService } from 'src/app/Dashboard/services/payment.service';
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
  userPayment: IUserPayment[] = [];
  carts: ICartDetails[] = [];
  userId: string = '';
  id: string = '';
  isPaymentButtonDisabled: boolean = true;
  isPaymentProcessDisabled: boolean = true;
  grandTotal: number = 0;
  paymentOption: string = '';
  showRadioButton = false;
  isDisabled: boolean = false;
  userAddress: string = '';
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
    private userService: UserService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private router: Router
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
  getCarts() {
    this.cartService
      .getCarts(this.userId)
      .subscribe((carts: ICartDetails[]) => {
        this.carts = carts;
      });
  }

  onDeleteCart(id?: string) {
    if (confirm('Are you sure you want to delete cart')) {
      this.cartService.deleteCart(id ?? '', this.userId).subscribe((data) => {
        this.getCarts();
      });
    } else {
      return;
    }
  }
  onDeleteAllCarts() {
    this.cartService.deleteAllCart(this.userId).subscribe((data) => {
      this.getCarts();
    });
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

  onPayFinalAmount() {
    let payment: IUserPayment = {
      dateOfPayment: new Date(),
      amount: this.getGrandTotal(this.carts) + 50,
      paymentType: this.paymentOption,
    };
    this.paymentService
      .addPaymentDetails(payment, this.userId)
      .subscribe((data) => {});
    console.log(DeliveryStatus.booked);
    for (let cart of this.carts) {
      let order: IOrderDetails = {
        productId: cart.productId,
        brand: cart.brand,
        name: cart.name,
        image: cart.photoUrl,
        price: cart.price,
        quantity: cart.quantity,
        totalAmount: cart.price * cart.quantity,
        paymentType: this.paymentOption,
        dateOfOrder: new Date(),
        address: this.userAddress,
        status: DeliveryStatus.booked,
      };
      this.orderService
        .addOrderDetails(order, this.userId)
        .subscribe((data) => {});
    }
    this.onDeleteAllCarts();
    this.router.navigate(['/']);
    console.log('order succesfully booked');
  }
  onEnableButton() {
    this.isPaymentButtonDisabled = false;
  }
}
