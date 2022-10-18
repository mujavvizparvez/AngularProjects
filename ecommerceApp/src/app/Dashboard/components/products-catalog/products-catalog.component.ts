import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bufferToggle } from 'rxjs';
import { IUserDetais } from 'src/app/Auth/models/IUserDeatails';
import { IProduct } from '../../../Admin/product/models/IProduct';
import { ProductService } from '../../../Admin/product/services/product.service';
import { MessageService } from '../../../Auth/services/message.service';
import { IWishlist } from '../../models/IWishlist';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css'],
})
export class ProductsCatalogComponent implements OnInit {
  products: IProduct[] = [];
  product!: IProduct;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private router: Router // private messageService: MessageService
  ) {}
  categoryId: string = '';
  productId: string = '';
  id: string = '';
  // heartColor = 'black';
  color = 'blue';
  err = true;
  searchText: string = '';

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
      console.log(data);
    });
    this.categoryId = this.route.snapshot.queryParams['catogoryId'];
    this.getProductByCategoryId(this.categoryId);

    this.productService.searchTextChanged.subscribe((searchedText) => {
      this.searchText = searchedText;
      console.log(this.searchText);
    });
  }

  onAddWIshlist(id: any) {
    debugger;
    let wishlist: IWishlist = {
      productId: this.productId,
      image: this.product.photoUrl,
      productName: this.product.name,
      price: this.product.price,
    };
    debugger;
    let userDetailsJson = localStorage.getItem('userDetails');
    let userDetails!: IUserDetais;
    if (userDetailsJson) userDetails = JSON.parse(userDetailsJson);
    this.wishlistService
      .addWishlist(wishlist, userDetails.userId)
      .subscribe((data) => {
        debugger;
        console.log(data);
      });
    this.err = !this.err;
  }
  onProductView(id: string) {
    this.router.navigate(['/products', id, 'view']);
  }
  getProductByCategoryId(categoryId: string) {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products.filter(
        (p) => categoryId == undefined || p.categoryId == categoryId
      );
    });
  }

  filterProducts(event: any) {
    let isCheckboxChekced = event.target.checked;
    let value = event.target.value;
    let controlName = event.target.name;
    if (this.categoryId == undefined) this.products = [];
    switch (controlName) {
      case 'category':
        if (isCheckboxChekced) {
          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (p) => p.categoryId == value
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter((f) => f.categoryId != value);
        }
        break;
      case 'subCategory':
        if (isCheckboxChekced) {
          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (p) => p.subCategoryId.toLowerCase() == value
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter(
            (p) => p.subCategoryId.toLowerCase() != value
          );
        }
        break;
      case 'gender':
        if (isCheckboxChekced) {
          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (p) => p.exclusiveFor.toLocaleLowerCase() == value
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter(
            (p) => p.exclusiveFor.toLowerCase() != value
          );
        }
        break;
      case 'price':
        let price = value.split('-');
        if (isCheckboxChekced) {
          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (p) =>
                  p.price >= parseInt(price[0]) && p.price <= parseInt(price[1])
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products.filter(
            (p) => parseInt(price[0]) && p.price <= parseInt(price[1])
          );
        }
        break;
      case 'brand':
        if (isCheckboxChekced) {
          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (f) => f.brand.toLowerCase() == value.toLowerCase()
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter(
            (f) => f.brand.toLowerCase() != value.toLowerCase()
          );
        }
        break;
      case 'color':
        if (isCheckboxChekced) {
          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (f) => f.color.toLowerCase() == value.toLowerCase()
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter(
            (f) => f.color.toLowerCase() != value.toLowerCase()
          );
        }
        break;
      case 'rating':
        if (isCheckboxChekced) {
          // this.products = this.products.filter((f) => f.rating <= value);

          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (f) => f.rating <= value
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter((f) => f.rating != value);
        }
        break;
      default:
      case 'size':
        if (isCheckboxChekced) {
          this.productService
            .getProducts()
            .subscribe((products: IProduct[]) => {
              let newProducts: IProduct[] = products.filter(
                (f) => f.size.toLowerCase() == value.toLowerCase()
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter(
            (f) => f.size.toLowerCase() != value.toLowerCase()
          );
        }
        break;
    }

    // filterProductsByGender(event: any) {
    //   debugger;
    //   let isCheckboxChekced = event.target.checked;
    //   let value = event.target.value;
    //   if (this.categoryId == undefined) this.products = [];
    //   if (isCheckboxChekced) {
    //     this.productService.getProducts().subscribe((products: IProduct[]) => {
    //       let newProducts: IProduct[] = products.filter(
    //         (p) => p.exclusiveFor.toLocaleLowerCase() == value
    //       );
    //       this.products = this.products.concat(newProducts);
    //     });
    //   } else {
    //     this.products = this.products.filter(
    //       (p) => p.exclusiveFor.toLowerCase() != value
    //     );
    //   }
    //   console.log(event);
    // }
    // filterProductsByPrice(event: any) {
    //   debugger;
    //   let isCheckboxChekced = event.target.checked;
    //   let value = event.target.value;
    //   if (this.categoryId == undefined) this.products = [];
    //   let price = value.split('-');
    //   if (isCheckboxChekced) {
    //     this.productService.getProducts().subscribe((products: IProduct[]) => {
    //       let newProducts: IProduct[] = products.filter(
    //         (p) => p.price >= parseInt(price[0]) && p.price <= parseInt(price[1])
    //       );
    //       this.products = this.products.concat(newProducts);
    //     });
    //   } else {
    //     this.products.filter(
    //       (p) => parseInt(price[0]) && p.price <= parseInt(price[1])
    //     );
    //   }
    // }

    // filterProductsByBrand(event: any) {
    //   let isCheckboxChekced = event.target.checked;
    //   let value = event.target.value;
    //   if (this.categoryId == undefined) this.products = [];
    //   if (isCheckboxChekced) {
    //     this.productService.getProducts().subscribe((products: IProduct[]) => {
    //       let newProducts: IProduct[] = products.filter(
    //         (f) => f.brand.toLowerCase() == value.toLowerCase()
    //       );
    //       this.products = this.products.concat(newProducts);
    //     });
    //   } else {
    //     this.products = this.products.filter(
    //       (f) => f.brand.toLowerCase() != value.toLowerCase()
    //     );
    //   }
    // }

    // filterProductsByColor(event: any) {
    //   let isCheckboxChekced = event.target.checked;
    //   let value = event.target.value;
    //   if (isCheckboxChekced) {
    //     this.productService.getProducts().subscribe((products: IProduct[]) => {
    //       let newProducts: IProduct[] = products.filter(
    //         (f) => f.color.toLowerCase() == value.toLowerCase()
    //       );
    //       this.products = this.products.concat(newProducts);
    //     });
    //   } else {
    //     this.products = this.products.filter(
    //       (f) => f.color.toLowerCase() != value.toLowerCase()
    //     );
    //   }
    // }

    // filterProductsByRating(event: any) {
    //   let isCheckboxChekced = event?.target.checked;
    //   let value = event.target.value;
    //   if (isCheckboxChekced) {
    //     // this.products = this.products.filter((f) => f.rating <= value);

    //     this.productService.getProducts().subscribe((products: IProduct[]) => {
    //       let newProducts: IProduct[] = products.filter((f) => f.rating <= value);
    //       this.products = this.products.concat(newProducts);
    //     });
    //   } else {
    //     this.products = this.products.filter((f) => f.rating != value);
    //   }
    // }

    // filterProductsBySize(event: any) {
    //   let isCheckboxChekced = event.target.checked;
    //   let value = event.target.value;
    //   if (isCheckboxChekced) {
    //     this.productService.getProducts().subscribe((products: IProduct[]) => {
    //       let newProducts: IProduct[] = products.filter(
    //         (f) => f.size.toLowerCase() == value.toLowerCase()
    //       );
    //       this.products = this.products.concat(newProducts);
    //     });
    //   } else {
    //     this.products = this.products.filter(
    //       (f) => f.size.toLowerCase() != value.toLowerCase()
    //     );
    //   }
  }
}
