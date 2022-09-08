import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Admin/categories/models/ICategory';
import { CategoryService } from 'src/app/Admin/categories/services/category.service';
import { IProduct } from '../../models/IProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categories: ICategory[] = [];
  products: IProduct[] = [];
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
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
    
      this.categories = data;
        console.log(data);
    });
  }
  onAddProduct() {
    let product = this.productForm.value;
    console.log(this.productForm.value)
    this.productService.addProduct(product).subscribe((data) => {
     this.router.navigate(['/admin/product/details']);
      
    })
  }
}
