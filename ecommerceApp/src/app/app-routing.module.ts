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
import { DashboardComponent } from './Dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },

  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'category/add', component: AddCategoryComponent },
      { path: 'category/details', component: CategoryDetailsComponent },
      { path: 'category/:id/edit', component: EditCategoryComponent },
      { path: 'product/add', component: AddProductComponent },
      { path: 'product/details', component: ProductDetailsComponent },
      { path: 'product/:name/edit', component: EditProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
