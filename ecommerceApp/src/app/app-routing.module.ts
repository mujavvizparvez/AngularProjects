import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './Admin/categories/components/add-category/add-category.component';
import { CategoryDetailsComponent } from './Admin/categories/components/category-details/category-details.component';
import { EditCategoryComponent } from './Admin/categories/components/edit-category/edit-category.component';
import { AdminHomeComponent } from './Admin/Dashboard/components/admin-home/admin-home.component';
import { LandingComponent } from './Admin/Dashboard/components/landing/landing.component';
import { AddProductComponent } from './Admin/product/components/add-product/add-product.component';
import { EditProductComponent } from './Admin/product/components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './Admin/product/components/product-details/product-details.component';
import { AddSubCategoryComponent } from './Admin/sub-category/components/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './Admin/sub-category/components/edit-sub-category/edit-sub-category.component';
import { SubCategoryDetailsComponent } from './Admin/sub-category/components/sub-category-details/sub-category-details.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { AuthGuard } from './Auth/Guards/auth.guard';
import { CartItemsComponent } from './Dashboard/components/cart-items/cart-items.component';
import { DashboardComponent } from './Dashboard/components/dashboard/dashboard.component';
import { ProductsCatalogComponent } from './Dashboard/components/products-catalog/products-catalog.component';
import { ProductViewComponent } from './Dashboard/components/product-view/product-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // {path:'',redirectTo:'login',pathMatch:'full'},

  {
    path: 'admin',
    component: AdminHomeComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: LandingComponent },
      { path: 'category/add', component: AddCategoryComponent },
      { path: 'category/details', component: CategoryDetailsComponent },
      { path: 'category/:id/edit', component: EditCategoryComponent },
      { path: 'product/add', component: AddProductComponent },
      { path: 'product/details', component: ProductDetailsComponent },
      { path: 'product/:name/edit', component: EditProductComponent },
      { path: 'subcategory/add', component: AddSubCategoryComponent },
      { path: 'subcategory/details', component: SubCategoryDetailsComponent },
      { path: 'subcategory/:name/edit', component: EditSubCategoryComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/filter', component: ProductsCatalogComponent },
  { path: 'products/catalog', component: ProductsCatalogComponent },
  { path: 'products/:id/view', component: ProductViewComponent },
  { path: 'products/cartItems', component: CartItemsComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'user/payment', component: UserPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
