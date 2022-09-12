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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
