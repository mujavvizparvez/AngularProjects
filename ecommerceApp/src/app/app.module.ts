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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
