import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
//import { AuthGuard } from './Auth/Guards/auth.guard';
import { CartItemsComponent } from './Dashboard/components/cart-items/cart-items.component';
import { DashboardComponent } from './Dashboard/components/dashboard/dashboard.component';
import { ProductsCatalogComponent } from './Dashboard/components/products-catalog/products-catalog.component';
import { ProductViewComponent } from './Dashboard/components/product-view/product-view.component';
import { UserPaymentComponent } from './User/components/user-payment/user-payment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'user',
    loadChildren: () => import('./user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin.module').then((m) => m.AdminModule),
  },
  { path: 'products/filter', component: ProductsCatalogComponent },
  { path: 'products/catalog', component: ProductsCatalogComponent },
  { path: 'products/:id/view', component: ProductViewComponent },
  {
    path: 'products/cartItems',
    component: CartItemsComponent,
    // canActivate: [AuthGuard]
  },
  { path: 'payment/:productId', component: UserPaymentComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
