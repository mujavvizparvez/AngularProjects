import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { ISubCategory } from 'src/app/Admin/sub-category/models/ISubCatetogory';
import { SubCategoryService } from 'src/app/Admin/sub-category/services/sub-category.service';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  categories: ICategory[] = [];
  subCategories: ISubCategory[] = [];
  products: IProduct[] = [];
  totalLength!: number;
  page: number = 1;
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.totalLength = this.products.length;
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
        this.subCategoryService
          .getSubCategories()
          .subscribe((subCategories: ISubCategory[]) => {
            this.productService
              .getProducts()
              .subscribe((products: IProduct[]) => {
                for (let product of products) {
                        let category = categories.find(
                          (s) => s.id == product.categoryId
                        );
                        let subCategory = subCategories.find(
                          (s) => s.id == product.subCategoryId
                        );
                        this.products.push({
                          ...product,
                          categoryName: category?.name ?? '',
                          subCategoryName: subCategory?.name ?? '',
                        });

                        
                      }

console.log(this.products);
                // for (let category of categories) {
                //   for (let subCategory of subCategories) {
                //     for (let product of products) {
                //       if (
                //         category.id == product.categoryId &&
                //         subCategory.id === product.subCategoryId
                //       ) {
                //         this.products.push({
                //           ...product,
                //           categoryName: category.name,
                //           subCategoryName: subCategory.name,
                //         });
                //       }
                //     }
                //   }
                // }
              });
          });
      });
  }
}
