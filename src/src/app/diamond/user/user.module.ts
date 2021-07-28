import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserLoginComponent} from "./user-login/user-login.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AuthGuardService as AuthGuard} from "../../api-services/authentication-guard.service";
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
    {
        path: 'login', component: UserLoginComponent,
        pathMatch: 'full'
    },
    {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
]

@NgModule({
    declarations: [
        UserLoginComponent,
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxSpinnerModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        UserLoginComponent,
        ChangePasswordComponent,
    ]
})
export class UserModule {
}
