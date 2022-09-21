import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../Admin/product/models/IProduct';
import { ProductService } from '../Admin/product/services/product.service';
import { CartService } from '../Dashboard/services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  productList: any;
  product!: IProduct;
  products: IProduct[] = [];
  // productData!: IProduct;
  productId: string = '';
  id: string = '';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
      console.log(data);
    });
    this.products.forEach((a: any) => {
      Object.assign(a, {  total: a.price });
    });
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
