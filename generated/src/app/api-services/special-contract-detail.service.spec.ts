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

import { SpecialContractDetailService } from './special-contract-detail.service';
import { SpecialContractDetail } from '../api-models/special-contract-detail.model'
import { SpecialContractDetails } from "../api-models/testing/fake-special-contract-detail.model"

describe('SpecialContractDetailService', () => {
  let injector: TestBed;
  let service: SpecialContractDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpecialContractDetailService]
    });
    injector = getTestBed();
    service = injector.get(SpecialContractDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSpecialContractDetails', () => {
    it('should return an Promise<SpecialContractDetail[]>', () => {
      const specialContractDetail = [
       {seqSpecCont:1234, seqSpecContDtl:1234, itemDescription:'sample data', procedureCode:'sample data', allowedAmt:1234, allowedReason:'sample data', multAmtByQty:'sample data', pctOfBilled:1234, pctBilledReason:'sample data', useGreaterOrLess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSpecCont:1234, seqSpecContDtl:1234, itemDescription:'sample data', procedureCode:'sample data', allowedAmt:1234, allowedReason:'sample data', multAmtByQty:'sample data', pctOfBilled:1234, pctBilledReason:'sample data', useGreaterOrLess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqSpecCont:1234, seqSpecContDtl:1234, itemDescription:'sample data', procedureCode:'sample data', allowedAmt:1234, allowedReason:'sample data', multAmtByQty:'sample data', pctOfBilled:1234, pctBilledReason:'sample data', useGreaterOrLess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSpecialContractDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractdetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(specialContractDetail);
    });
  });


  describe('#createSpecialContractDetail', () => {
    var id = 1;
    it('should return an Promise<SpecialContractDetail>', () => {
      const specialContractDetail: SpecialContractDetail = {seqSpecCont:1234, seqSpecContDtl:1234, itemDescription:'sample data', procedureCode:'sample data', allowedAmt:1234, allowedReason:'sample data', multAmtByQty:'sample data', pctOfBilled:1234, pctBilledReason:'sample data', useGreaterOrLess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSpecialContractDetail(specialContractDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractdetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSpecialContractDetail', () => {
    var id = 1;
    it('should return an Promise<SpecialContractDetail>', () => {
      const specialContractDetail: SpecialContractDetail = {seqSpecCont:1234, seqSpecContDtl:1234, itemDescription:'sample data', procedureCode:'sample data', allowedAmt:1234, allowedReason:'sample data', multAmtByQty:'sample data', pctOfBilled:1234, pctBilledReason:'sample data', useGreaterOrLess:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSpecialContractDetail(specialContractDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractdetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSpecialContractDetail', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSpecialContractDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/specialcontractdetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});