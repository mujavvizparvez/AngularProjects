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
import { AddCategoryComponent } from './Admin/categories/components/add-category/add-category.component';
import { CategoryDetailsComponent } from './Admin/categories/components/category-details/category-details.component';
import { EditCategoryComponent } from './Admin/categories/components/edit-category/edit-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './Admin/product/components/add-product/add-product.component';
import { ProductDetailsComponent } from './Admin/product/components/product-details/product-details.component';
import { EditProductComponent } from './Admin/product/components/edit-product/edit-product.component';
import { AdminHomeComponent } from './Admin/Dashboard/components/admin-home/admin-home.component';
import { HomePageComponent } from './Dashboard/components/home-page/home-page.component';
import { SidebarComponent } from './Admin/Dashboard/components/sidebar/sidebar.component';
import { LandingComponent } from './Admin/Dashboard/components/landing/landing.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SubCategoryDetailsComponent } from './Admin/sub-category/components/sub-category-details/sub-category-details.component';
import { EditSubCategoryComponent } from './Admin/sub-category/components/edit-sub-category/edit-sub-category.component';
import { AddSubCategoryComponent } from './Admin/sub-category/components/add-sub-category/add-sub-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductsFilterComponent } from './Dashboard/components/products-filter/products-filter.component';
import { ProductsCatalogComponent } from './Dashboard/components/products-catalog/products-catalog.component';
import { ProductViewComponent } from './Dashboard/components/product-view/product-view.component';
import { CartItemsComponent } from './Dashboard/components/cart-items/cart-items.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserProfileComponent } from './User/components/user-profile/user-profile.component';
import { UserPaymentComponent } from './User/components/user-payment/user-payment.component';
import { MyOrdersComponent } from './User/components/my-orders/my-orders.component';
import { UserHomeComponent } from './User/components/user-home/user-home.component';
import { UserSidebarComponent } from './User/components/user-sidebar/user-sidebar.component';
import { OrderDetailsComponent } from './Admin/orders/order-details/order-details.component';
import { MyWishlistComponent } from './User/components/my-wishlist/my-wishlist.component';
//import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProductCategoriesComponent,
    BannerComponent,
    TrendingProductsComponent,
    FooterComponent,
    AddCategoryComponent,
    CategoryDetailsComponent,
    EditCategoryComponent,
    AddProductComponent,
    ProductDetailsComponent,
    EditProductComponent,
    AdminHomeComponent,
    HomePageComponent,
    SidebarComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    AddSubCategoryComponent,
    SubCategoryDetailsComponent,
    EditSubCategoryComponent,
    ProductsFilterComponent,
    ProductsCatalogComponent,
    ProductViewComponent,
    CartItemsComponent,
    UserProfileComponent,
    UserPaymentComponent,
    MyOrdersComponent,
    UserHomeComponent,
    UserSidebarComponent,
    OrderDetailsComponent,
    MyWishlistComponent,
    //MatExpansionModule,
  ],
  imports: [
    BrowserModule,
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
