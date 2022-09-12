import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  categories: ICategory[] = [];
  // products: IProduct[] = [];
  productId: string = '';
  productForm: FormGroup = new FormGroup({
    brand: new FormControl(''),
    name: new FormControl(''),
    categoryId: new FormControl(''),
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
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.productId = this.route.snapshot.params['name'];
    this.productService
      .getProductById(this.productId)
      .subscribe((data: IProduct) => {
        this.productForm.setValue({
          brand: data.brand,
          categoryId: data.categoryId,
          name: data.name,
          photoUrl: data.photoUrl,
          exclusiveFor: data.exclusiveFor,
          price: data.price,
          rating: data.rating,
          description: data.description,
          color: data.color,
          size: data.size,
          quantity: data.quantity,
        });
      });
  }
  onUpdateProduct() {
    this.productService
      .updateProduct(this.productForm.value, this.productId)
      .subscribe((data) => {
        this.router.navigate(['admin/product/details']);
        console.log(data);
      });
  }
}
