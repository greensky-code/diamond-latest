/* Copyright (c) 2020 . All Rights Reserved. */
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "./shared/components/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', function () {
    let de: DebugElement;
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

     beforeEach(async(() => {
         TestBed.configureTestingModule({
             imports: [RouterTestingModule],
             providers:[
                 AlertMessageService
             ],
             declarations: [ AppComponent ]
         })
         .compileComponents();
     }));

     beforeEach(() => {
         fixture = TestBed.createComponent(AppComponent);
         comp = fixture.componentInstance;
         de = fixture.debugElement.query(By.css('p'));
     });

     it('should create component', () => expect(comp).toBeDefined());

     it('should have expected <p> text', () => {
         fixture.detectChanges();
         const p = de.nativeElement;
         expect(p.innerText).toBe('COPYRIGHT © 2017 - 2020, Company Name. - ALL RIGHTS RESERVED.');
     });

});