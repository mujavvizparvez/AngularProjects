import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddCategoryComponent } from "./Admin/categories/components/add-category/add-category.component";
import { CategoryDetailsComponent } from "./Admin/categories/components/category-details/category-details.component";
import { EditCategoryComponent } from "./Admin/categories/components/edit-category/edit-category.component";
import { AdminHomeComponent } from "./Admin/Dashboard/components/admin-home/admin-home.component";
import { LandingComponent } from "./Admin/Dashboard/components/landing/landing.component";
import { OrderDetailsComponent } from "./Admin/orders/order-details/order-details.component";
import { AddProductComponent } from "./Admin/product/components/add-product/add-product.component";
import { EditProductComponent } from "./Admin/product/components/edit-product/edit-product.component";
import { ProductDetailsComponent } from "./Admin/product/components/product-details/product-details.component";
import { AddSubCategoryComponent } from "./Admin/sub-category/components/add-sub-category/add-sub-category.component";
import { EditSubCategoryComponent } from "./Admin/sub-category/components/edit-sub-category/edit-sub-category.component";
import { SubCategoryDetailsComponent } from "./Admin/sub-category/components/sub-category-details/sub-category-details.component";

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
  //canActivate: [AuthGuard],
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
      { path: 'order/details', component: OrderDetailsComponent },
    ],
  },
];
@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports:[RouterModule]
})
export class AdminRoutingModule{

}