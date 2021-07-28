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

import { CapTransService } from './cap-trans.service';
import { CapTrans } from '../api-models/cap-trans.model'
import { CapTranss } from "../api-models/testing/fake-cap-trans.model"

describe('CapTransService', () => {
  let injector: TestBed;
  let service: CapTransService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapTransService]
    });
    injector = getTestBed();
    service = injector.get(CapTransService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapTranss', () => {
    it('should return an Promise<CapTrans[]>', () => {
      const capTrans = [
       {seqCapTrans:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', seqCapAdjustment:1234, processingStatus:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, postingRule:'sample data', seqApTrans:1234, postDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', checkDate:'2018-01-01', seqCapVendAddress:1234, adjustmentFlag:'sample data', accessIncentiveIncluded:'sample data', qualityIncentiveIncluded:'sample data', fileType:'sample data'},
       {seqCapTrans:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', seqCapAdjustment:1234, processingStatus:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, postingRule:'sample data', seqApTrans:1234, postDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', checkDate:'2018-01-01', seqCapVendAddress:1234, adjustmentFlag:'sample data', accessIncentiveIncluded:'sample data', qualityIncentiveIncluded:'sample data', fileType:'sample data'},
       {seqCapTrans:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', seqCapAdjustment:1234, processingStatus:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, postingRule:'sample data', seqApTrans:1234, postDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', checkDate:'2018-01-01', seqCapVendAddress:1234, adjustmentFlag:'sample data', accessIncentiveIncluded:'sample data', qualityIncentiveIncluded:'sample data', fileType:'sample data'}

      ];
      service.getCapTranss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/captranss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capTrans);
    });
  });


  describe('#createCapTrans', () => {
    var id = 1;
    it('should return an Promise<CapTrans>', () => {
      const capTrans: CapTrans = {seqCapTrans:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', seqCapAdjustment:1234, processingStatus:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, postingRule:'sample data', seqApTrans:1234, postDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', checkDate:'2018-01-01', seqCapVendAddress:1234, adjustmentFlag:'sample data', accessIncentiveIncluded:'sample data', qualityIncentiveIncluded:'sample data', fileType:'sample data'};
      service.createCapTrans(capTrans).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captranss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapTrans', () => {
    var id = 1;
    it('should return an Promise<CapTrans>', () => {
      const capTrans: CapTrans = {seqCapTrans:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capEntityCode:'sample data', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', seqProvId:1234, seqVendId:1234, transType:'sample data', capStoplossId:'sample data', seqCapAdjustment:1234, processingStatus:'sample data', capTransAmt:1234, pmpmWitholdAmt:1234, postingRule:'sample data', seqApTrans:1234, postDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', checkDate:'2018-01-01', seqCapVendAddress:1234, adjustmentFlag:'sample data', accessIncentiveIncluded:'sample data', qualityIncentiveIncluded:'sample data', fileType:'sample data'};
      service.updateCapTrans(capTrans, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captranss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapTrans', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapTrans(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/captranss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});