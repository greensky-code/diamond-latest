/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
/**
 *
 * This file allows Polyfills to be bundled separately from the application and vendor bundles.
 *
 * You'll need polyfills to run an Angular application in most browsers as explained in
 * the Browser Support guide (https://angular.io/guide/browser-support).
 *
 * Because this bundle file will load first, polyfills.ts is also a good place to
 * configure the browser environment for production or development.
 *
 * See also: https://angular.io/guide/webpack#polyfills
 */
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';


import 'zone.js/dist/zone';
