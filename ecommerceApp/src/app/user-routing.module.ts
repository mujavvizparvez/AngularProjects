import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyOrdersComponent } from "./User/components/my-orders/my-orders.component";
import { UserHomeComponent } from "./User/components/user-home/user-home.component";
import { UserProfileComponent } from "./User/components/user-profile/user-profile.component";

const userRoutes: Routes = [
    {
    path: '',
    component: UserHomeComponent,
    children: [
      { path: '', component: UserProfileComponent },
      { path: 'orders', component: MyOrdersComponent },
    ],
  },
]
@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports:[RouterModule]
})
export class UserRoutingModule{

}
