import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  categories: ICategory[] = [];
  products: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  onDeleteProduct(id: any) {
    if (confirm('Are you sure you want to delete product')) {
      this.productService.deleteProduct(id).subscribe((data) => {
        this.getProduct();
      });
    } else {
      return;
    }
  }
  getProduct() {
    this.products = [];
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.productService.getProducts().subscribe((products: IProduct[]) => {
          for (let category of categories) {
            for (let product of products) {
              if (category.id === product.categoryId) {
                this.products.push({ ...product, categoryName: category.name });
              }
            }
          }
        });
      });
  }
}
