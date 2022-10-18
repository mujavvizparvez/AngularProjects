import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { ProductService } from 'src/app/Admin/product/services/product.service';
import { IUserDetais } from 'src/app/Auth/models/IUserDeatails';
import { IOrderDetails, IUserOrderDetails } from 'src/app/Dashboard/models/IOrderDetails';
import { IUser } from 'src/app/Dashboard/models/IUser';
import { OrderService } from 'src/app/Dashboard/services/order.service';
import { UserService } from 'src/app/Dashboard/services/users.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  categoryCount: number = 0;
  productCount: number = 0;
  orderCount: number = 0;
  userCount: number = 0;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categoryCount = categories.length;
      });
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.productCount = products.length;
    });
    this.orderService
      .getAllOrderDetails()
      .subscribe((orders: IUserOrderDetails[]) => {
        this.orderCount = orders.length;
      });
    this.userService.getUser().subscribe((users: IUser[]) => {
      this.userCount = users.length;
    });
  }
}
