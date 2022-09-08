import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { ProductService } from 'src/app/Admin/product/services/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  categoryCount: number = 0;
  productCount: number = 0;
  constructor(private categoryService:CategoryService,private productService:ProductService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: ICategory[]) => {
      this.categoryCount = categories.length;
    })
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.productCount = products.length;
    });
  }

}
