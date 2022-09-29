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

  ngOnInit(): void {
    let userDetailsJson = localStorage.getItem('userDetails');
    let userDetails!: IUserDetais;
    if (userDetailsJson) userDetails = JSON.parse(userDetailsJson);
    this.userId = userDetails.userId;
    this.getCarts();
  }

  getCarts() {
    this.cartService
      .getCarts(this.userId)
      .subscribe((carts: ICartDetails[]) => {
        this.carts = carts;
        this.getGrandTotal(carts);
      });
  }

  onUpdateCart(cart: ICartDetails) {
    this.cartService
      .updateCart(cart, cart.id ?? '', this.userId)
      .subscribe((data) => {
        this.getCarts();
      });
  }

  // sum: number = 0;
  onDeleteCart(id?: string) {
    if (confirm('Are you sure you want to delete cart')) {
      this.cartService.deleteCart(id ?? '', this.userId).subscribe((data) => {
        this.getCarts();
      });
    } else {
      return;
    }
  }
  getGrandTotal(carts: ICartDetails[]) {
    debugger;
    let finalTotal = 0;
    carts.forEach((item) => {
      let total = item.quantity * item.price;
      finalTotal += total;
    });
    this.grandTotal = finalTotal;
  }
}
