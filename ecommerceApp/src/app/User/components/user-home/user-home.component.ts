import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { IOrderDetails } from 'src/app/Dashboard/models/IOrderDetails';
import { IUser } from 'src/app/Dashboard/models/IUser';
import { OrderService } from 'src/app/Dashboard/services/order.service';
import { UserService } from 'src/app/Dashboard/services/users.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  orders: IOrderDetails[] = [];
  user!: IUser;
  constructor(private orderService: OrderService,private userService:UserService,
    private authService:AuthService) { }
  ngOnInit(): void {
   // debugger;
      // this.orderService
      //   .getAllOrderDetails()
      //   .subscribe((orders: IOrderDetails[]) => {
      //     this.orders = orders;
      //   });
    this.userService.getUser().subscribe((data)=>{})
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
//  this.cartService.deleteCart(this.userId,this.carts[0].id??'').subscribe((data) => {