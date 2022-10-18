import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Admin/product/models/IProduct';
import { ProductService } from 'src/app/Admin/product/services/product.service';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.css'],
})
export class TrendingProductsComponent implements OnInit {
  menProducts: IProduct[] = [];
  womenProducts: IProduct[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProductByType();
  }
  onProductView(id: string) {
    console.log(id);
    this.router.navigate(['/products/catalog']);
  }
  // addEvent(x:any) {
  //   x.select = x.select;
  // }
  goToWishlist() {
  }
  getProductByType() {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.menProducts = products.filter((f) => f.exclusiveFor == 'Men');
      this.womenProducts = products.filter((f) => f.exclusiveFor == 'Women');
    });
  }

  slideConfig = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
}


