/* Copyright (c) 2020 . All Rights Reserved. */

import { Component } from '@angular/core';

/**
 * Angular Component to configure the Diamond feature module.
 *
 * Angular modules are often used to group a set of code for a set of views for a feature area from 
 * a user's point of view. For example, in the Tour of Heros tutorial on the Angular website, 
 * "Heros" is a "feature" (sometimes also called a "feature set" or perhaps a "subject area"). 
 * Therefore, a Feature Module Typescript File is used to declare all of the components that are 
 * used inside a feature module and provides any services defined as part of the feature module. 
 * The term Feature Module is used and described in more detail 
 * in the Angular 2: First Look training course on Pluralsight.com.
 *
 * The template for this module just uses the <router-outlet> tag so that the Angular Router
 * framework can be used to display the content defined by the routes in the related
 * routing module defined for this feature module.
 */
@Component({
  selector: 'diamond-diamonds-root',
  template: `<router-outlet></router-outlet>`
})
export class DiamondComponent {

}