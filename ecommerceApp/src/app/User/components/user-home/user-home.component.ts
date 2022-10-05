import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { IOrderDetails } from 'src/app/Dashboard/models/IOrderDetails';
import { OrderService } from 'src/app/Dashboard/services/order.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  orders: IOrderDetails[] = [];
  constructor(private orderService: OrderService,
    private authService:AuthService) { }
  ngOnInit(): void {
   // debugger;
      this.orderService
        .getAllOrderDetails()
        .subscribe((orders: IOrderDetails[]) => {
          this.orders = orders;
        });
    // let userDetails = this.authService.userDetails;
    // if (userDetails) {
    //   this.userId = userDetails.userId;
    //   this.orderService
    //     .getAllOrderDetails()
    //     .subscribe((orders: IOrderDetails[]) => {
    //       this.orders = orders;
    //     });
    // }
  }
}
