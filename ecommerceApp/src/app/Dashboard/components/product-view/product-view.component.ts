import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserDetais } from 'src/app/Auth/models/IUserDeatails';
import { IProduct } from '../../../Admin/product/models/IProduct';
import { ProductService } from '../../../Admin/product/services/product.service';
import { ICartDetails } from '../../models/ICartDetails';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  product!: IProduct;
  productId: string = '';
  size: string = '';
  quantity!: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
      console.log(data);
    });
    // this.products.forEach((a: any) => {
    //   Object.assign(a, {  total: a.price });
    // });
  }

  // addToCart(product: any) {
  //   this.cartService.addToCart(product);
  // }
  // onAddToCart() {
  //   //let cartItem = this.addToCartForm.value;
  //   this.productService.getProductById(this.id).subscribe((data) => {
  //     this.product = data;
  //   })
  // this.cartService.addCart(this.product).subscribe((data) => {

  // })

  // this.router.navigate(['/products/cartItems']);
  //  };

  onSizeChange(event: any) {
    this.size = event.target.value;
  }
  onAddToCart() {
    let cart: ICartDetails = {
      productId: this.productId,
      brand: this.product.brand,
      name: this.product.name,
      color: this.product.color,
      price: this.product.price,
      quantity: this.quantity,
      size: this.size,
      photoUrl: this.product.photoUrl,
    };

    let userDetailsJson = localStorage.getItem('userDetails');
    let userDetails!: IUserDetais;
    if (userDetailsJson) userDetails = JSON.parse(userDetailsJson);

    this.cartService.addCart(cart, userDetails.userId).subscribe((data) => {
      console.log(data);
    });
  }
}
