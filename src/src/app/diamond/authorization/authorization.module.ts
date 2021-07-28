import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PopUpMessageModule} from '../../shared/components/pop-up-message/pop-up.message.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AuthorizationProceduresComponent} from './authorization-procedures/authorization-procedures.component';
import {AuthorizationCodeComponent} from './authorization-code/authorization-code.component';
import {AuthorizationPhysicianAdvisorComponent} from './authorization-physician-advisor/authorization-physician-advisor.component';
import {MemberAuthorizationDisplayComponent} from './member-authorization-display/member-authorization-display.component';
import {AuthWaiveRulesComponent} from './auth-waive-rules/auth-waive-rules.component';
import {AlertMessageModule} from '../../shared/components/alert-message/alert.message.module';
import {AuthorizationDaysVisitsUpdateComponent} from './authorization-days-visits-update/authorization-days-visits-update.component';
import {AuthClaimMatchRulesComponent} from "./auth-claim-match-rules/auth-claim-match-rules.component";
import {AuthorizationMasterComponent} from './authorization-master/authorization-master.component';
import {AuthProcedureRangesComponent} from "./auth-procedure-ranges/auth-procedure-ranges.component";
import {AuthorizationAppealsComponent} from './authorization-appeals/authorization-appeals.component';
import {AuthorizationTypeComponent} from './authorization-type/authorization-type.component';
import {AgGridModule} from 'ag-grid-angular';
import {TransactionTypeComponent} from './authorization-type/cell-renderers/transaction-type.component';
import {ScreenRankComponent} from './authorization-type/cell-renderers/screen-rank.component';
import {AuthInfo1} from './member-authorization-display/auth-info1';
import {AuthInfo2} from './member-authorization-display/auth-info2';
import {AuthInfo3} from './member-authorization-display/auth-info3';
import { AuthorizationSecondOpinionComponent } from './authorization-second-opinion/authorization-second-opinion.component';

const routes: Routes = [
    {path: 'authorization-procedures', component: AuthorizationProceduresComponent},
    {path: 'authorization-code', component: AuthorizationCodeComponent},
    {path: 'auth-waive-rules', component: AuthWaiveRulesComponent},
    {path: 'physician-advisor', component: AuthorizationPhysicianAdvisorComponent},
    {path: 'member-authorization-display', component: MemberAuthorizationDisplayComponent},
    {path: 'authorization-days-visits-update', component: AuthorizationDaysVisitsUpdateComponent},
    {path: 'auth-claim-match-rules', component: AuthClaimMatchRulesComponent},
    {path: 'auth-procedure-ranges', component: AuthProcedureRangesComponent},
    {path: 'auth-master', component: AuthorizationMasterComponent},
    {path: 'authorization-type', component: AuthorizationTypeComponent},
    {path: 'authorization-appeals', component: AuthorizationAppealsComponent},
    { path: 'authorization-second-opinion', component: AuthorizationSecondOpinionComponent }
];

@NgModule({
    declarations: [
        AuthorizationProceduresComponent,
        AuthorizationCodeComponent,
        AuthorizationPhysicianAdvisorComponent,
        MemberAuthorizationDisplayComponent,
        AuthWaiveRulesComponent,
        AuthorizationDaysVisitsUpdateComponent,
        AuthClaimMatchRulesComponent,
        AuthorizationSecondOpinionComponent,
        AuthProcedureRangesComponent,
        AuthorizationAppealsComponent,
        AuthorizationMasterComponent,
        AuthorizationTypeComponent,
        TransactionTypeComponent,
        ScreenRankComponent,
        AuthInfo1,
        AuthInfo2,
        AuthInfo3
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule,
        AlertMessageModule,
        NgxSpinnerModule,
        AgGridModule.withComponents([TransactionTypeComponent, ScreenRankComponent])
    ],
    exports: [
        AuthorizationProceduresComponent,
        AuthorizationCodeComponent,
        AuthWaiveRulesComponent,
        AuthorizationPhysicianAdvisorComponent,
        AuthorizationDaysVisitsUpdateComponent,
        AuthorizationSecondOpinionComponent,
        AuthProcedureRangesComponent,
        AuthorizationAppealsComponent,
        AuthorizationMasterComponent,
        AuthorizationTypeComponent,
        TransactionTypeComponent,
        ScreenRankComponent
    ],
})
export class AuthorizationModule {
}
