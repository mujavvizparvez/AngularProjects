import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from './admin-routing.module';
import { AddCategoryComponent } from './Admin/categories/components/add-category/add-category.component';
import { CategoryDetailsComponent } from './Admin/categories/components/category-details/category-details.component';
import { EditCategoryComponent } from './Admin/categories/components/edit-category/edit-category.component';
import { AdminHomeComponent } from './Admin/Dashboard/components/admin-home/admin-home.component';
import { LandingComponent } from './Admin/Dashboard/components/landing/landing.component';
import { SidebarComponent } from './Admin/Dashboard/components/sidebar/sidebar.component';
import { AddProductComponent } from './Admin/product/components/add-product/add-product.component';
import { EditProductComponent } from './Admin/product/components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './Admin/product/components/product-details/product-details.component';
import { AddSubCategoryComponent } from './Admin/sub-category/components/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './Admin/sub-category/components/edit-sub-category/edit-sub-category.component';
import { SubCategoryDetailsComponent } from './Admin/sub-category/components/sub-category-details/sub-category-details.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AddCategoryComponent,
    CategoryDetailsComponent,
    EditCategoryComponent,
    AddProductComponent,
    ProductDetailsComponent,
    EditProductComponent,
    AdminHomeComponent,
    SidebarComponent,
    LandingComponent,
    AddSubCategoryComponent,
    SubCategoryDetailsComponent,
    EditSubCategoryComponent,
  ],
  imports: [
    SharedModule,
    // RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],

})
export class AdminModule {}
