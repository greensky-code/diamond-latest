import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PopUpMessageModule} from '../../shared/components/pop-up-message/pop-up.message.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TradingPartnerMasterComponent} from './trading-partner-master/trading-partner-master.component';
import {ProcessEdiComponent} from './process-edi/process-edi.component';
import {EdiWorkTableEditComponent} from './edi-work-table-edit/edi-work-table-edit.component';
import { SubmitterMasterComponent } from './submitter-master/submitter-master.component';
import {ProcessEdiJobStatisticsComponent} from "./job-statistics/job-statistics.component";

const routes: Routes = [
    {path: 'trading-partner-master', component: TradingPartnerMasterComponent},
    {path: 'process-edi', component: ProcessEdiComponent},
    {path: 'edit-work-table-edit', component: EdiWorkTableEditComponent},
    {path: 'submitter-master', component: SubmitterMasterComponent},
];

@NgModule({
    declarations: [
        TradingPartnerMasterComponent,
        ProcessEdiComponent,
        EdiWorkTableEditComponent,
        SubmitterMasterComponent,
        ProcessEdiJobStatisticsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule,
        NgxSpinnerModule,
        AgGridModule.withComponents([]),
    ],
    exports: [
        TradingPartnerMasterComponent,
        ProcessEdiComponent,
        ProcessEdiJobStatisticsComponent,
        EdiWorkTableEditComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EdiModule {
}
