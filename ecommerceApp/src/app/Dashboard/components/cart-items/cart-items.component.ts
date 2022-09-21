import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  products: IProduct[] = [];
  grandTotal: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((data) => {
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }
  removeItem(product: any) {
    this.cartService.removeCartItem(product);

  }
  emptyCart() {
    this.cartService.removeAllCart()
  }
}
