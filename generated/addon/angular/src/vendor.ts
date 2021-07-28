/*
 * Used by Webpack during the build process to tell Webpack
 * what belongs in the vendor js bundle file so that the
 * relatively stable vendor code modules are packaged in a
 * separate js bundle file from the more volatile application code.
 */
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
import 'rxjs';

