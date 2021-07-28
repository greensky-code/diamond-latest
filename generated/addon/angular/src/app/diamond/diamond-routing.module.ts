/* Copyright (c) 2021 . All Rights Reserved. */

/**
 * Routing definition for the Diamond feature module
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiamondComponent } from './diamond.component';
import { ExternalCarrierComponent } from './external-carrier/external-carrier.component';
import { PricingPartnerDetailComponent } from './pricing-partner-detail/pricing-partner-detail.component';

// Configure route paths referenced at a constant named 'routes'
// Parent and child routes get put together to create the actual route
const routes: Routes = [
    {
        // The empty path is specified here because, with lazily loaded routes, 
        // the child path url is specified in the app root module
        path: '', 
        component: DiamondComponent,
        children: [
            { path: 'externalcarrier', component: ExternalCarrierComponent },
            { path: 'pricingpartnerdetail', component: PricingPartnerDetailComponent },
        ]
    }
];

// Create and export the DiamondRoutingModule class configured with the @NgModulef
// RouterModule.forChild() must be used to import the route definitions in feature modules 
// rather than using forRoot(), which must be used in the root app module. 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiamondRoutingModule {

}

// Create an array of routable components that are exporting 
// which we will need to use in the feature module
export const diamondRoutedComponents = [
    DiamondComponent,
    ExternalCarrierComponent,
    PricingPartnerDetailComponent,
];