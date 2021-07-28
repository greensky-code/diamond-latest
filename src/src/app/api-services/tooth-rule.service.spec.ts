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

import { ToothRuleService } from './tooth-rule.service';
import { ToothRule } from '../api-models/tooth-rule.model'
import { ToothRules } from "../api-models/testing/fake-tooth-rule.model"

describe('ToothRuleService', () => {
  let injector: TestBed;
  let service: ToothRuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToothRuleService]
    });
    injector = getTestBed();
    service = injector.get(ToothRuleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getToothRules', () => {
    it('should return an Promise<ToothRule[]>', () => {
      const toothRule = [
       {seqToothRuleId:1234, toothRuleId:'sample data', toothNumber:'sample data', procedureCode:'sample data', description:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', fromAge:1234, toAge:1234, userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', allSurfaceInd:'sample data', allArchInd:'sample data', allQuadInd:'sample data', allOralInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqToothRuleId:1234, toothRuleId:'sample data', toothNumber:'sample data', procedureCode:'sample data', description:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', fromAge:1234, toAge:1234, userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', allSurfaceInd:'sample data', allArchInd:'sample data', allQuadInd:'sample data', allOralInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqToothRuleId:1234, toothRuleId:'sample data', toothNumber:'sample data', procedureCode:'sample data', description:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', fromAge:1234, toAge:1234, userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', allSurfaceInd:'sample data', allArchInd:'sample data', allQuadInd:'sample data', allOralInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getToothRules().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/toothrules/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(toothRule);
    });
  });


  describe('#createToothRule', () => {
    var id = 1;
    it('should return an Promise<ToothRule>', () => {
      const toothRule: ToothRule = {seqToothRuleId:1234, toothRuleId:'sample data', toothNumber:'sample data', procedureCode:'sample data', description:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', fromAge:1234, toAge:1234, userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', allSurfaceInd:'sample data', allArchInd:'sample data', allQuadInd:'sample data', allOralInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createToothRule(toothRule).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothrules`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateToothRule', () => {
    var id = 1;
    it('should return an Promise<ToothRule>', () => {
      const toothRule: ToothRule = {seqToothRuleId:1234, toothRuleId:'sample data', toothNumber:'sample data', procedureCode:'sample data', description:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', fromAge:1234, toAge:1234, userDefined1:'sample data', userDate1:'2018-01-01', userDefined2:'sample data', userDate2:'2018-01-01', allSurfaceInd:'sample data', allArchInd:'sample data', allQuadInd:'sample data', allOralInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateToothRule(toothRule, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothrules/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteToothRule', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteToothRule(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/toothrules/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});