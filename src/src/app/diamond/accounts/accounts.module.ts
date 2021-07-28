import { NgModule } from '@angular/core';
import {AccountsPayableComponent} from "./accounts-payable/accounts-payable.component";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {PopUpMessageModule} from "../../shared/components/pop-up-message/pop-up.message.module";
import {AccountsPayableVendorDisplayComponent} from "./accounts-payable-vendor-display/accounts-payable-vendor-display.component";
import { AccountsPayableVendorDisplayFilterComponent } from './accounts-payable-vendor-display-filter/accounts-payable-vendor-display-filter.component';

const routes: Routes = [
    {path: "accounts-payable",  component: AccountsPayableComponent},
    {path: "accounts-payable-vendor-display",  component: AccountsPayableVendorDisplayComponent}
];


@NgModule({
    declarations: [
        AccountsPayableComponent,
        AccountsPayableVendorDisplayComponent,
        AccountsPayableVendorDisplayFilterComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule,
    ],
    exports: [
        AccountsPayableComponent,
        AccountsPayableVendorDisplayComponent,
        AccountsPayableVendorDisplayFilterComponent
    ],
})
export class AccountsModule {}