/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { ToothRuleSelectService } from './tooth-rule-select.service';
import { ToothRuleSelect } from '../api-models/tooth-rule-select.model'
import { ToothRuleSelects } from "../api-models/testing/fake-tooth-rule-select.model"

describe('ToothRuleSelectService', () => {
  let injector: TestBed;
  let service: ToothRuleSelectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToothRuleSelectService]
    });
    injector = getTestBed();
    service = injector.get(ToothRuleSelectService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getToothRuleSelects', () => {
    it('should return an Promise<ToothRuleSelect[]>', () => {
      const toothRuleSelect = [
       {seqToothRuleId:1234, seqToothRuleSel:1234, toothRuleSelectType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqToothRuleId:1234, seqToothRuleSel:1234, toothRuleSelectType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqToothRuleId:1234, seqToothRuleSel:1234, toothRuleSelectType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getToothRuleSelects().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/toothruleselects/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(toothRuleSelect);
    });
  });


  describe('#createToothRuleSelect', () => {
    var id = 1;
    it('should return an Promise<ToothRuleSelect>', () => {
      const toothRuleSelect: ToothRuleSelect = {seqToothRuleId:1234, seqToothRuleSel:1234, toothRuleSelectType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createToothRuleSelect(toothRuleSelect).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothruleselects`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateToothRuleSelect', () => {
    var id = 1;
    it('should return an Promise<ToothRuleSelect>', () => {
      const toothRuleSelect: ToothRuleSelect = {seqToothRuleId:1234, seqToothRuleSel:1234, toothRuleSelectType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateToothRuleSelect(toothRuleSelect, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothruleselects/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteToothRuleSelect', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteToothRuleSelect(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothruleselects/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});