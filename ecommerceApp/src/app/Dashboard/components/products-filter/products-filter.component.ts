import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../../Admin/categories/models/ICategory';
import { CategoryService } from '../../../Admin/categories/services/category.service';
import { IProduct } from '../../../Admin/product/models/IProduct';
import { ProductService } from '../../../Admin/product/services/product.service';
import { ISubCategory } from '../../../Admin/sub-category/models/ISubCatetogory';
import { SubCategoryService } from '../../../Admin/sub-category/services/sub-category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css'],
})
export class ProductsFilterComponent implements OnInit {
  categories: IFilterCategory[] = [];
  subCategories: ISubCategory[] = [];
  products: IProduct[] = [];
  @Input() categoryId: string = '';
  @Output() filterProducts = new EventEmitter<any>();
  @Output() filterProductsByGender = new EventEmitter<any>();
  @Output() filterProductsByPrice = new EventEmitter<any>();
  @Output() filterProductsByBrand = new EventEmitter<any>();
  @Output() filterProductsByColor = new EventEmitter<any>();
  @Output() filterProductsByRating = new EventEmitter<any>();
  @Output() filterProductsBySize = new EventEmitter<any>();
  subCategoryId: string = '';

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSubCategoryByCategoryId(this.categoryId);
    this.categoryService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        for (let category of categories) {
          this.categories.push({
            ...category,
            checked: category.id == this.categoryId,
          });
        }
      });
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }

  getSubCategoryByCategoryId(categoryId: string) {
    this.subCategoryService
      .getSubCategories()
      .subscribe((data: ISubCategory[]) => {
        this.subCategories = data.filter((p) => p.categoryId == categoryId);
      });
  }

  getSubCategoryOnCheckboxAction(event: any) {
    let isCheckboxChekced = event.target.checked;
    let value = event.target.value;

    if (isCheckboxChekced) {
      this.subCategoryService
        .getSubCategories()
        .subscribe((subCategories: ISubCategory[]) => {
          let newSubCategories: ISubCategory[] = subCategories.filter(
            (p) => p.categoryId == value
          );
          this.subCategories = this.subCategories.concat(newSubCategories);
        });
    } else {
      this.subCategories = this.subCategories.filter(
        (f) => f.categoryId != value
      );
    }
  }

  filterByCategory(event: any) {
    this.getSubCategoryOnCheckboxAction(event);
    this.filterProducts.emit(event);
  }
  // filterByGender(event: any) {
  //   this.filterProductsByGender.emit(event);
  // }
  // filterByPrice(event: any) {
  //   this.filterProductsByPrice.emit(event);
  // }
  // filterByBrand(event: any) {
  //   this.filterProductsByBrand.emit(event);
  // }
  // filterByColor(event: any) {
  //   this.filterProductsByColor.emit(event);
  // }
  // filterByRating(event: any) {
  //   this.filterProductsByRating.emit(event);
  // }
  // filterBySize(event: any) {
  //   this.filterProductsBySize.emit(event);
  // }
}

export interface IFilterCategory extends ICategory {
  checked: boolean;
}
