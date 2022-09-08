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
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.productForm.setValue({
        brand: data.brand,
        name: data.name,
        categoryId: data.categoryId,
        price: data.price,
        rating: data.rating,
        description: data.description,
        photoUrl: data.photoUrl,
        color: data.color,
        size: data.size,
        quantity: data.quantity,
      });
    })
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
