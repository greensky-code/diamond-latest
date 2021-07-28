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

import { BillTypeMasterService } from './bill-type-master.service';
import { BillTypeMaster } from '../api-models/bill-type-master.model'
import { BillTypeMasters } from "../api-models/testing/fake-bill-type-master.model"

describe('BillTypeMasterService', () => {
  let injector: TestBed;
  let service: BillTypeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BillTypeMasterService]
    });
    injector = getTestBed();
    service = injector.get(BillTypeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBillTypeMasters', () => {
    it('should return an Promise<BillTypeMaster[]>', () => {
      const billTypeMaster = [
       {billType:'sample data', description:'sample data', inpOutpInd:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {billType:'sample data', description:'sample data', inpOutpInd:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {billType:'sample data', description:'sample data', inpOutpInd:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getBillTypeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/billtypemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(billTypeMaster);
    });
  });


  describe('#createBillTypeMaster', () => {
    var id = 1;
    it('should return an Promise<BillTypeMaster>', () => {
      const billTypeMaster: BillTypeMaster = {billType:'sample data', description:'sample data', inpOutpInd:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createBillTypeMaster(billTypeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/billtypemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBillTypeMaster', () => {
    var id = 1;
    it('should return an Promise<BillTypeMaster>', () => {
      const billTypeMaster: BillTypeMaster = {billType:'sample data', description:'sample data', inpOutpInd:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateBillTypeMaster(billTypeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/billtypemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBillTypeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBillTypeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/billtypemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});