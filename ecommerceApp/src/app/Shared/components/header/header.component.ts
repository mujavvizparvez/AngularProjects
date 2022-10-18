import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { ProductService } from 'src/app/Admin/product/services/product.service';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { MessageService } from 'src/app/Auth/services/message.service';
import { ICartDetails } from 'src/app/Dashboard/models/ICartDetails';
import { CartService } from 'src/app/Dashboard/services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  totalItem: number = 0;
  products: IProduct[] = [];
  enteredSearchValue: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    let userDetails = this.authService.userDetails;
    this.isLoggedIn = userDetails ? true : false;
    this.authService.loggedInEvent.subscribe((data) => {
      this.isLoggedIn = data;
    });

    if (userDetails)
      this.cartService
        .getCarts(userDetails.userId)
        .subscribe((data) => (this.totalItem = data.length));
  }

  onSearchTextChanged() {
    this.productService.searchProduct(this.enteredSearchValue);
  }

  ngAfterViewChecked() {}
  onLogout() {
    this.authService.logout();
    this.messageService.setSuccessMessage('User loggedout successfully');
    this.router.navigate(['/login']);
  }
}
