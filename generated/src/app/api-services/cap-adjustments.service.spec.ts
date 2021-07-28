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

import { CapAdjustmentsService } from './cap-adjustments.service';
import { CapAdjustments } from '../api-models/cap-adjustments.model'
import { CapAdjustmentss } from "../api-models/testing/fake-cap-adjustments.model"

describe('CapAdjustmentsService', () => {
  let injector: TestBed;
  let service: CapAdjustmentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapAdjustmentsService]
    });
    injector = getTestBed();
    service = injector.get(CapAdjustmentsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapAdjustmentss', () => {
    it('should return an Promise<CapAdjustments[]>', () => {
      const capAdjustments = [
       {seqCapAdjustment:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', capPoolId:'sample data', adjustmentDate:'2018-01-01', seqProvId:1234, seqVendId:1234, capMonthRun:'2018-01-01', description:'sample data', applyTo:'sample data', capStoplossId:'sample data', adjustmentAmt:1234, status:'sample data', companyCode:'sample data', glRefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqMembrId:1234, seqVendAddress:1234, adjustReason:'sample data', userDefine1:'sample data', userDefine2:'sample data', userDefine3:'sample data', userDefineDate:'2018-01-01', postCode:'sample data', capEntityId:'sample data'},
       {seqCapAdjustment:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', capPoolId:'sample data', adjustmentDate:'2018-01-01', seqProvId:1234, seqVendId:1234, capMonthRun:'2018-01-01', description:'sample data', applyTo:'sample data', capStoplossId:'sample data', adjustmentAmt:1234, status:'sample data', companyCode:'sample data', glRefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqMembrId:1234, seqVendAddress:1234, adjustReason:'sample data', userDefine1:'sample data', userDefine2:'sample data', userDefine3:'sample data', userDefineDate:'2018-01-01', postCode:'sample data', capEntityId:'sample data'},
       {seqCapAdjustment:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', capPoolId:'sample data', adjustmentDate:'2018-01-01', seqProvId:1234, seqVendId:1234, capMonthRun:'2018-01-01', description:'sample data', applyTo:'sample data', capStoplossId:'sample data', adjustmentAmt:1234, status:'sample data', companyCode:'sample data', glRefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqMembrId:1234, seqVendAddress:1234, adjustReason:'sample data', userDefine1:'sample data', userDefine2:'sample data', userDefine3:'sample data', userDefineDate:'2018-01-01', postCode:'sample data', capEntityId:'sample data'}

      ];
      service.getCapAdjustmentss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capadjustmentss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capAdjustments);
    });
  });


  describe('#createCapAdjustments', () => {
    var id = 1;
    it('should return an Promise<CapAdjustments>', () => {
      const capAdjustments: CapAdjustments = {seqCapAdjustment:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', capPoolId:'sample data', adjustmentDate:'2018-01-01', seqProvId:1234, seqVendId:1234, capMonthRun:'2018-01-01', description:'sample data', applyTo:'sample data', capStoplossId:'sample data', adjustmentAmt:1234, status:'sample data', companyCode:'sample data', glRefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqMembrId:1234, seqVendAddress:1234, adjustReason:'sample data', userDefine1:'sample data', userDefine2:'sample data', userDefine3:'sample data', userDefineDate:'2018-01-01', postCode:'sample data', capEntityId:'sample data'};
      service.createCapAdjustments(capAdjustments).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capadjustmentss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapAdjustments', () => {
    var id = 1;
    it('should return an Promise<CapAdjustments>', () => {
      const capAdjustments: CapAdjustments = {seqCapAdjustment:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', capPoolId:'sample data', adjustmentDate:'2018-01-01', seqProvId:1234, seqVendId:1234, capMonthRun:'2018-01-01', description:'sample data', applyTo:'sample data', capStoplossId:'sample data', adjustmentAmt:1234, status:'sample data', companyCode:'sample data', glRefCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqMembrId:1234, seqVendAddress:1234, adjustReason:'sample data', userDefine1:'sample data', userDefine2:'sample data', userDefine3:'sample data', userDefineDate:'2018-01-01', postCode:'sample data', capEntityId:'sample data'};
      service.updateCapAdjustments(capAdjustments, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capadjustmentss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapAdjustments', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapAdjustments(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capadjustmentss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});