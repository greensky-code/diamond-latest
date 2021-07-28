/* Copyright (c) 2020 . All Rights Reserved. */

/**
 * Define the routes for the root/app module
 */
import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { PageListComponent } from './pagelist/pagelist.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found.component';

// Configure route paths referenced at a constant named 'routes'
//
// The loadChildren parameter is used to configure Angular to lazy load feature module routes.
// Rather than specifying a component (which is an object) in a path, the value specified
// for the loadChildren is a string representing the path to an Angular module
// to be lazily loaded. It is the actual module filename and path followed by
// the hash symbol and then the name of the module.
//
// For example, '/app/feature1/feature1.module#Feature1Module'
// would be a reference to a module named Feature1Module defined in
// the file /app/feature1/feature1.module.ts. 
// When the router naviates to this route, it uses the loadchildren string to
// dynamically laod the Feature1Module. Then, it adds the Feature1Module to 
// its current route configuration and then it loads the requested route to the
// destination component in the Feature1Module, where the destination component
// is defined in the Feature1RoutingModule (which is in the feature1-routing.module.ts file. 
//
// See also: https://angular.io/docs/ts/latest/guide/router.html#!#lazy-loading-route-config
// See also: The Angular Modules section of the Angular 2: First Look training course by 
//           John Papa on Pluralsight.com
//
// The Dashboard Component is the default web page and is eagerly loaded so that it is
// immediately avaiable to the user. By specifying the component here by name,
// it will be eagerly loaded.
const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'diamond', loadChildren: () => import('./diamond/diamond.module').then(m => m.DiamondModule) },
    // Specify the default page when the base url is accessed
    { path: '', pathMatch: 'full', redirectTo: 'diamond/functional-groups' },
    // The path for the PageNotFoundComponent needs to be listed last 
    // so that we don't match on more specific route paths
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

// Create and export the AppRouteModule class configured with the @NgModule 
//
// We pass the PreloadAllModules object to the forRoot() method on the RouterModule 
// so that anything that's lazily loaded will start to preload in the background, 
// but it won't delay the user's experience of using and interacting with the eagerly loaded modules.
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

// Create an array of routable components that are exporting 
// which we will need to use in the feature module
export const appRoutableComponents = [
    DashboardComponent,
    PageListComponent,
    PageNotFoundComponent,
    ReportsComponent
];