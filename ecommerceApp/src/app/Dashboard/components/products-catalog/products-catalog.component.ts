import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../Admin/product/models/IProduct';
import { ProductService } from '../../../Admin/product/services/product.service';
import { MessageService } from '../../../Auth/services/message.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css'],
})
export class ProductsCatalogComponent implements OnInit {
  products: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute // private messageService: MessageService
  ) {}
  categoryId: string = '';
  ngOnInit(): void {
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
                (p) => p.subCategoryId.toLocaleLowerCase() == value
              );
              this.products = this.products.concat(newProducts);
            });
        } else {
          this.products = this.products.filter(
            (p) => p.subCategoryId.toLowerCase() != value
          );
        }

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

      case 'rating':
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
