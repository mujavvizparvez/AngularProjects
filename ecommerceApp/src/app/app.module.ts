import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/components/header/header.component';
import { DashboardComponent } from './Dashboard/components/dashboard/dashboard.component';
import { ProductCategoriesComponent } from './Dashboard/components/product-categories/product-categories.component';
import { BannerComponent } from './Dashboard/components/banner/banner.component';
import { TrendingProductsComponent } from './Dashboard/components/trending-products/trending-products.component';
import { FooterComponent } from './Shared/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './Dashboard/components/home-page/home-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductsFilterComponent } from './Dashboard/components/products-filter/products-filter.component';
import { ProductsCatalogComponent } from './Dashboard/components/products-catalog/products-catalog.component';
import { ProductViewComponent } from './Dashboard/components/product-view/product-view.component';
import { CartItemsComponent } from './Dashboard/components/cart-items/cart-items.component';
import { UserPaymentComponent } from './User/components/user-payment/user-payment.component';
import { OrderDetailsComponent } from './Admin/orders/order-details/order-details.component';
import { MyWishlistComponent } from './User/components/my-wishlist/my-wishlist.component';
import { AdminModule } from './admin.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProductCategoriesComponent,
    BannerComponent,
    TrendingProductsComponent,
    FooterComponent,
    HomePageComponent,
    ProductsFilterComponent,
    ProductsCatalogComponent,
    ProductViewComponent,
    CartItemsComponent,
    UserPaymentComponent,
    OrderDetailsComponent,
    MyWishlistComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    //AdminModule,
    AuthModule,
    //UserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgImageSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
