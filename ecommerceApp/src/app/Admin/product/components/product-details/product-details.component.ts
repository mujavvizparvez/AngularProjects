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
 // searchText:string='';
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService
  ) {}
  // searchText: string = '';
  ngOnInit(): void {
    this.getProduct();
    this.totalLength = this.products.length;
  }
  // OnSerchTextEntered(searchValue:string) {
  //   this.searchText = searchValue;
  //   console.log(this.searchText)
  //   }
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
                    (s) =>
                      s.id == product.subCategoryId &&
                      s.categoryId == product.categoryId
                  );
                  this.products.push({
                    ...product,
                    categoryName: category?.name ?? '',
                    subCategoryName: subCategory?.name ?? '',
                  });
                }
                console.log(this.products);
              });
          });
      });
  }
}
