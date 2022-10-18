import { Component, OnInit } from '@angular/core';
import { IUserDetais } from 'src/app/Auth/models/IUserDeatails';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { DeliveryStatus } from 'src/app/Dashboard/models/DeliveryStatus';
import {
  IOrderDetails,
  IUserOrderDetails,
} from 'src/app/Dashboard/models/IOrderDetails';
import { IUser } from 'src/app/Dashboard/models/IUser';
import { OrderService } from 'src/app/Dashboard/services/order.service';
import { UserService } from 'src/app/Dashboard/services/users.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private userService: UserService
  ) {}
  statusChange: string = '';
  userOrders: IUserOrderDetails[] = [];
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

  ngOnInit(): void {
    this.orderService
      .getAllOrderDetails()
      .subscribe((orders: IUserOrderDetails[]) => {
        this.userOrders = orders;
        console.log(this.userOrders);
      });
  }

  onChangeStatus(event: any) {
    this.statusChange = event.target.value;
    console.log(this.statusChange);
  }

  onUpdateStatus(order: IOrderDetails, userId: string) {
   order.status = this.statusChange;
    order.dateOfOrder = new Date();
    this.orderService
      .updateOrderDetails(order, order.id ?? '', userId)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
