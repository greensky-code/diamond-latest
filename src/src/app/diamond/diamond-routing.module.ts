/* Copyright (c) 2020 . All Rights Reserved. */

/**
 * Routing definition for the Diamond feature module
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DiamondComponent} from './diamond.component';
import {FunctionalGroupsComponent} from './main-menu/functional-groups/functional-groups.component';
import {FunctionalGroupShortCutComponent} from './main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {AuthGuardService as AuthGuard} from '../../app/api-services/authentication-guard.service'

// Configure route paths referenced at a constant named 'routes'
// Parent and child routes get put together to create the actual route
const routes: Routes = [
    {
        // The empty path is specified here because, with lazily loaded routes,
        // the child path url is specified in the app root module
        path: "",
        component: DiamondComponent,
        children: [
            {
                path: "functional-groups",
                component: FunctionalGroupsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "functional-group-shortcut",
                component: FunctionalGroupShortCutComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "user",
                loadChildren: () =>
                    import("./user/user.module").then((m) => m.UserModule),
            },

            {
                path: "member",
                loadChildren: () =>
                    import("./member/member.module").then((m) => m.MemberModule),
                canActivate: [AuthGuard],
            },

            {
                path: "benefits",
                loadChildren: () =>
                    import("./benefits/benefits.module").then((m) => m.BenefitsModule),
                canActivate: [AuthGuard],
            },

            {
                path: 'claims',
                loadChildren: () => import('./claims/claims.module').then(m => m.ClaimsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'pricing',
                loadChildren: () => import('./pricing/pricing.module').then(p => p.PricingModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'vendor',
                loadChildren: () => import('./vendor/vendor.module').then(p => p.VendorModule),
                canActivate: [AuthGuard]
            },

            {
                path: 'provider',
                loadChildren: () => import('./provider/provider.module').then(p => p.ProviderModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'premium',
                loadChildren: () => import('./premium/premium.module').then(p => p.PremiumModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'addon',
                loadChildren: () => import('./addon/addons.module').then(p => p.AddonsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'authorization',
                loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'support',
                loadChildren: () => import('./support/support.module').then(p => p.SupportModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'system',
                loadChildren: () => import('./system/system.module').then(p => p.SystemModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'security',
                loadChildren: () => import('./security/security.module').then(p => p.SecurityModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'accounts',
                loadChildren: () => import('./accounts/accounts.module').then(p => p.AccountsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'ap',
                loadChildren: () => import('./ap/ap.module').then(p => p.ApModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'edi',
                loadChildren: () => import('./edi/edi.module').then(p => p.EdiModule),
                canActivate: [AuthGuard]
            }
        ]
    }
];

// Create and export the DiamondRoutingModule class configured with the @NgModulef
// RouterModule.forChild() must be used to import the route definitions in feature modules
// rather than using forRoot(), which must be used in the root app module.
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class DiamondRoutingModule {

}

// Create an array of routable components that are exporting
// which we will need to use in the feature module
export const diamondRoutedComponents = [
    DiamondComponent,
];
