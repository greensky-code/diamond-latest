import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PopUpMessageModule} from '../../shared/components/pop-up-message/pop-up.message.module';
import {FieldLevelSecuritySetupComponent} from './field-level-security-setup/field-level-security-setup.component';
import {WindowsAccessComponent} from './windows-access/windows-access.component';
import {CheckboxCellComponent} from '../../shared/components/checkbox-renderer/checkbox-cell.component';
import { FunctionAccessComponent } from './function-access/function-access.component';
import { UsersComponent } from './users/users.component';
import {UpdateUserPasswordComponent} from './update-user-password/update-user-password.component';
import { AddDatabaseUserComponent } from './add-database-user/add-database-user.component';
import { ResetDatabasePasswordComponent } from './reset-database-password/reset-database-password.component';
import {CopyWindowsAccessComponent} from "./copy-windows-access/copy-windows-access.component";
import {CopyFieldLevelSecurityComponent} from "./field-level-security-setup/copy-field-level-security/copy-field-level-security.component";
import { CopyFunctionAccessComponent } from './copy-function-access/copy-function-access.component';
import { UserErrorPopupComponent } from './users/user-error-popup/user-error-popup.component';
import {SecurityHelpComponent} from "./security-help/security-help.component";



const routes: Routes = [
    {path: 'field-level-security', component: FieldLevelSecuritySetupComponent},
    {path: 'window-access', component: WindowsAccessComponent},
    {path: 'function-access', component: FunctionAccessComponent },
    {path: 'users', component: UsersComponent},
    {path: 'resetPassword',component:ResetDatabasePasswordComponent}
]

@NgModule({
    declarations: [
        ResetDatabasePasswordComponent,
        FieldLevelSecuritySetupComponent,
        FunctionAccessComponent,
        WindowsAccessComponent,
        CheckboxCellComponent,
        UsersComponent,
        UpdateUserPasswordComponent,
        AddDatabaseUserComponent,
        CopyWindowsAccessComponent,
        CopyFieldLevelSecurityComponent,
        CopyFunctionAccessComponent,
        UserErrorPopupComponent,
        SecurityHelpComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule
    ],
    exports: [
        ResetDatabasePasswordComponent,
        FieldLevelSecuritySetupComponent,
        FunctionAccessComponent,
        WindowsAccessComponent,
        CheckboxCellComponent,
        UsersComponent,
        AddDatabaseUserComponent,
        CopyWindowsAccessComponent,
        CopyFieldLevelSecurityComponent,
        UserErrorPopupComponent,
        SecurityHelpComponent
    ]
})
export class SecurityModule {
}
