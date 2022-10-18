import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { IOrderDetails } from 'src/app/Dashboard/models/IOrderDetails';
import { OrderService } from 'src/app/Dashboard/services/order.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: IOrderDetails[] = [];
  userId: string = '';
  statusChange: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let userDetails = this.authService.userDetails;
    if (userDetails) {  
      this.userId = userDetails.userId;
      this.orderService
        .getOrderDetails(this.userId)
        .subscribe((orders: IOrderDetails[]) => {
          this.orders = orders;
        });
    }
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
  // changeDateFormat(date: Date) { 
  //   debugger
  //   let pipe = new DatePipe('en-US');
  //   const now = Date.now();
  //   const myFormattedDate = this.pipe.transform(now, 'short');
  //   formatDate(date, 'dd/MM/yyyy', 'en-US');
  // }
  //   getAllUserOrders() {
  //   this.orderService
  //     .getAllOrderDetails()
  //     .subscribe((orders: IOrderDetails[]) => {
  //       this.orders = orders;
  //     });
  // }

