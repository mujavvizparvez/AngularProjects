import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategoryByType('male');
  }

  getCategoryByType(type: string) {
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories.filter((f) => f.type == type);
      });
  }
}
  //  this.cartService.getCarts(userDetails.userId).subscribe((data) => {
  //    if (data.length == 0) {
  //      this.cartService
  //        .addCart(cart, userDetails.userId)
  //        .subscribe((data) => {});
  //    } else {
  //      let d = data.filter((p) => {
  //        return p.productId == cart.productId;
  //      });
  //      if (d.length != 0) {
  //        alert('Product is already cart');
  //      } else {
  //        this.cartService
  //          .addCart(cart, userDetails.userId)
  //          .subscribe((data) => {});
  //      }
  //    }
  //  });