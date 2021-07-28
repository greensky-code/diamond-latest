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

import { PmbMembBillHistService } from './pmb-memb-bill-hist.service';
import { PmbMembBillHist } from '../api-models/pmb-memb-bill-hist.model'
import { PmbMembBillHists } from "../api-models/testing/fake-pmb-memb-bill-hist.model"

describe('PmbMembBillHistService', () => {
  let injector: TestBed;
  let service: PmbMembBillHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbMembBillHistService]
    });
    injector = getTestBed();
    service = injector.get(PmbMembBillHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbMembBillHists', () => {
    it('should return an Promise<PmbMembBillHist[]>', () => {
      const pmbMembBillHist = [
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', recordType:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', planRiderCode:'sample data', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', familySize:1234, spouseFlag:'sample data', premiumStep:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', recordType:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', planRiderCode:'sample data', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', familySize:1234, spouseFlag:'sample data', premiumStep:'sample data'},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', recordType:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', planRiderCode:'sample data', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', familySize:1234, spouseFlag:'sample data', premiumStep:'sample data'}

      ];
      service.getPmbMembBillHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembbillhists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbMembBillHist);
    });
  });


  describe('#createPmbMembBillHist', () => {
    var id = 1;
    it('should return an Promise<PmbMembBillHist>', () => {
      const pmbMembBillHist: PmbMembBillHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', recordType:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', planRiderCode:'sample data', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', familySize:1234, spouseFlag:'sample data', premiumStep:'sample data'};
      service.createPmbMembBillHist(pmbMembBillHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembbillhists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbMembBillHist', () => {
    var id = 1;
    it('should return an Promise<PmbMembBillHist>', () => {
      const pmbMembBillHist: PmbMembBillHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', recordType:'sample data', detailFromDate:'2018-01-01', detailThruDate:'2018-01-01', planRiderCode:'sample data', premiumAmt:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', familySize:1234, spouseFlag:'sample data', premiumStep:'sample data'};
      service.updatePmbMembBillHist(pmbMembBillHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembbillhists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbMembBillHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbMembBillHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembbillhists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});