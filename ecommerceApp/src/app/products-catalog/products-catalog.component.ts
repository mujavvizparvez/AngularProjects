import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../Admin/product/models/IProduct';
import { ProductService } from '../Admin/product/services/product.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css'],
})
export class ProductsCatalogComponent implements OnInit {
  products: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  categoryId: string = '';
  ngOnInit(): void {
    debugger;
    this.categoryId = this.route.snapshot.queryParams['catogoryId'];
    // this.route.queryParams.subscribe((params) => {
    //   this.categoryId = params['catogoryId'];
    // });
    this.getProductByCategoryId(this.categoryId);
    // this.productService.getProducts().subscribe((products: IProduct[]) => {
    //   this.products = products;
    // });
  }
  getProductByCategoryId(categoryId: string) {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products.filter((p) => (categoryId == undefined || p.categoryId == categoryId));
    });
  }
}
