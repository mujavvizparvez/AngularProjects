import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { ProductService } from 'src/app/Admin/product/services/product.service';
import { IUserDetais } from 'src/app/Auth/models/IUserDeatails';
import { ICartDetails } from '../../models/ICartDetails';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  grandTotal: number = 0;
  carts: ICartDetails[] = [];
  id: string = '';
  userId: string = '';
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  // ngOnInit(): void {
  //   this.cartService.getProducts().subscribe((data) => {
  //     this.products = data;
  //     this.grandTotal = this.cartService.getTotalPrice();
  //   });
  // }
  // removeItem(product: any) {
  //   this.cartService.removeCartItem(product);

  // }
  // emptyCart() {
  //   this.cartService.removeAllCart()
  // }

  ngOnInit(): void {
    let userDetailsJson = localStorage.getItem('userDetails');
    let userDetails!: IUserDetais;
    if (userDetailsJson) userDetails = JSON.parse(userDetailsJson);
    this.userId = userDetails.userId;
    this.getCarts();
   //this.getgrandTotal();
  }
  getgrandTotal() {
    // for (let cart of this.carts) {
    //   this.grandTotal = cart.price + this.grandTotal;
    // }
      for (let i = 0; i < this.carts.length; i++) {
        this.grandTotal += Number(this.carts[i].quantity) * Number(this.carts[i].price);
        console.log(this.grandTotal);
      }

      // if (this.cartDetails.length == 0) {
      //   this.empty = true;
      // }
  }

  getCarts() {
    this.cartService
      .getCarts(this.userId)
      .subscribe((carts: ICartDetails[]) => {
        this.carts = carts;
      });
  }

  onUpdateCart(cart: ICartDetails) {
    this.cartService
      .updateCart(cart, cart.id ?? '', this.userId)
      .subscribe((data) => {
        this.getCarts();
      });
  }

  onDeleteCart(id?: string) {
    if (confirm('Are you sure you want to delete cart')) {
      this.cartService.deleteCart(id ?? '', this.userId).subscribe((data) => {
        this.getCarts();
      });
    } else {
      return;
    }
  }
}
