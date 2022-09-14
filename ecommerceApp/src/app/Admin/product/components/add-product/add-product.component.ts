import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { ISubCategory } from 'src/app/Admin/sub-category/models/ISubCatetogory';
import { SubCategoryService } from 'src/app/Admin/sub-category/services/sub-category.service';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categories: ICategory[] = [];
  subCategories: ISubCategory[] = [];
  products: IProduct[] = [];
  productForm: FormGroup = new FormGroup({
    brand: new FormControl(''),
    name: new FormControl(''),
    categoryId: new FormControl(''),
    subCategoryId: new FormControl({ value: '', disabled : true }),
    exclusiveFor: new FormControl(''),
    price: new FormControl(''),
    rating: new FormControl(''),
    description: new FormControl(''),
    photoUrl: new FormControl(''),
    color: new FormControl(''),
    size: new FormControl(''),
    quantity: new FormControl(''),
  });
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }
  OnCategoryChange(categoryId: string) {
    this.subCategoryService
      .getSubCategories()
      .subscribe((data: ISubCategory[]) => {
        this.subCategories = data.filter((p) => p.categoryId == categoryId);
      });
    this.productForm.enable();
  }
  onAddProduct() {
    let product = this.productForm.value;
    console.log(this.productForm.value);
    this.productService.addProduct(product).subscribe((data) => {
      this.router.navigate(['/admin/product/details']);
    });
  }
}