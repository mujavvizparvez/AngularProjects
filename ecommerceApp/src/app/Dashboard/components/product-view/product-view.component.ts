import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  @ViewChild('form') selectSizeForm!: NgForm;
  product!: IProduct;
  btnText: string = 'ADD TO CART';
  showCartBtn = true;
  productId: string = '';
  size: string = '';
  quantity: number = 1;
  isSizeSelected = true;
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
  
  }
  onSizeClicked() {
    console.log(this.selectSizeForm.value);
  }
  onSizeChange(event: any) {
    this.size = event.target.value;
    this.isSizeSelected = false;
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
    
  
      this.cartService.getCarts(userDetails.userId).subscribe((data) => {
     if (data.length == 0) {
       this.cartService
         .addCart(cart, userDetails.userId)
         .subscribe((data) => {});
     } else {
       let d = data.filter((p) => {
         return p.productId == cart.productId;
       });
       
       if (d.length != 0) {
         alert('Cart is already present')
       } else {
         this.cartService
           .addCart(cart, userDetails.userId)
           .subscribe((data) => {});
       }
     }
      
   });
    this.showCartBtn = false;

    //this.btnText = 'GO TO CART';
  }
  
  onGOToCart() {
    this.router.navigate(['/products/cartItems']);
  }
  onGoToBuy() {
    this.onAddToCart();
    this.router.navigate(['/payment',this.productId]);
  }

}
  //  this.cartService.getCarts(userDetails.userId).subscribe((data) => {
  //    if (data.length == 0) {
  //      this.cartService
  //        .addCart(cart, userDetails.userId)
  //        .subscribe((data) => {});
  //    } else {
  //      let d = data.filter((p) => {
  //        return p.productId == cart.productId;
  //      });
  //      if (d.length != 0) {
  //        alert('Product is already cart');
  //      } else {
  //        this.cartService
  //          .addCart(cart, userDetails.userId)
  //          .subscribe((data) => {});
  //      }
  //    }
  //  });



