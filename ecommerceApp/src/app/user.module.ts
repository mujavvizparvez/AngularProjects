import { NgModule } from "@angular/core";
import {  ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./shared.module";
import { UserRoutingModule } from "./user-routing.module";
import { MyOrdersComponent } from "./User/components/my-orders/my-orders.component";
import { UserHomeComponent } from "./User/components/user-home/user-home.component";
import { UserProfileComponent } from "./User/components/user-profile/user-profile.component";
import { UserSidebarComponent } from "./User/components/user-sidebar/user-sidebar.component";

@NgModule({
    declarations: [
        UserHomeComponent,
        UserProfileComponent,
        MyOrdersComponent,
        UserSidebarComponent
    ],
    imports: [
        UserRoutingModule,
        SharedModule,
        RouterModule,
        ReactiveFormsModule
        
    ]
})
export class UserModule{

}