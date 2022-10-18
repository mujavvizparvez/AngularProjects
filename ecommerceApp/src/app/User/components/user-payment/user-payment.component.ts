import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Auth/services/message.service';
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
  userDetails!: IUserDetais;
  userId: string = '';
  productId!: string;
  isPaymentButtonDisabled: boolean = true;
  isPaymentProcessDisabled: boolean = true;
  grandTotal: number = 0;
  paymentOption: string = '';
  showRadioButton = false;
  isDisabled: boolean = false;
  cardNumber: number = 0;
  expDate: number = 0;
  cvv: number = 0;
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
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    debugger;
    this.productId = this.route.snapshot.params['productId'];

    // console.log(new Date().getTime());
    let userDetails = this.authService.userDetails;
    if (userDetails) {
      this.userId = userDetails.userId;
      this.cartService.getCarts(this.userId).subscribe((data) => {
        this.carts = data;
      });
      this.userService.getUser().subscribe((data) => {
        this.user = data.find((s) => s.userId == this.userId);
      });

      if (this.productId) {
        this.cartService.getCarts(this.userId).subscribe((data) => {
          this.carts = data.filter((p) => p.productId == this.productId);
        });
      }
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
    debugger;
    if (this.productId) {
      debugger;
      this.cartService.getCarts(this.userId).subscribe((data) => {
        this.carts = data.filter((p) => p.productId == this.productId);
      });
    }

    let payment: IUserPayment = {
      dateOfPayment: new Date(),
      amount: this.getGrandTotal(this.carts) + 50,
      paymentType: this.paymentOption,
    };
    this.paymentService
      .addPaymentDetails(payment, this.userId)
      .subscribe((data) => {});

    for (let cart of this.carts) {
      let order: IOrderDetails = {
        userName: this.user?.fullName ?? '',
        productId: cart.productId,
        brand: cart.brand,
        productName: cart.name,
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

    if (this.productId) {
      debugger;
      this.cartService;
      this.cartService
        .deleteCart(this.carts[0].id ?? '', this.userId)
        .subscribe((data) => {
          this.getCarts();
        });
    } else {
      debugger;
      this.onDeleteAllCarts();
    }
    this.router.navigate(['/']);
    this.messageService.setSuccessMessage('Your order booked successfully');
  }
  onEnableButton() {
    this.isPaymentButtonDisabled = false;
  }
}
