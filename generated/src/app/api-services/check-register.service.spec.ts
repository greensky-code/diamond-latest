/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CheckRegisterService } from './check-register.service';
import { CheckRegister } from '../api-models/check-register.model'
import { CheckRegisters } from "../api-models/testing/fake-check-register.model"

describe('CheckRegisterService', () => {
  let injector: TestBed;
  let service: CheckRegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckRegisterService]
    });
    injector = getTestBed();
    service = injector.get(CheckRegisterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCheckRegisters', () => {
    it('should return an Promise<CheckRegister[]>', () => {
      const checkRegister = [
       {bulkAmt:1234, remittanceId:1234, bulkPayInd:'sample data', category:'sample data', crossReference:'sample data', statChngRsnCode:'sample data', statChngDate:'2018-01-01', manualCheckFlag:'sample data', eftTransNumber:'sample data', seqCkprtId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', checkStatus:'sample data', clearDate:'2018-01-01', checkAmt:1234, companyCode:'sample data', seqVendAddress:1234, seqVendId:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data'},
       {bulkAmt:1234, remittanceId:1234, bulkPayInd:'sample data', category:'sample data', crossReference:'sample data', statChngRsnCode:'sample data', statChngDate:'2018-01-01', manualCheckFlag:'sample data', eftTransNumber:'sample data', seqCkprtId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', checkStatus:'sample data', clearDate:'2018-01-01', checkAmt:1234, companyCode:'sample data', seqVendAddress:1234, seqVendId:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data'},
       {bulkAmt:1234, remittanceId:1234, bulkPayInd:'sample data', category:'sample data', crossReference:'sample data', statChngRsnCode:'sample data', statChngDate:'2018-01-01', manualCheckFlag:'sample data', eftTransNumber:'sample data', seqCkprtId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', checkStatus:'sample data', clearDate:'2018-01-01', checkAmt:1234, companyCode:'sample data', seqVendAddress:1234, seqVendId:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data'}

      ];
      service.getCheckRegisters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/checkregisters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(checkRegister);
    });
  });


  describe('#createCheckRegister', () => {
    var id = 1;
    it('should return an Promise<CheckRegister>', () => {
      const checkRegister: CheckRegister = {bulkAmt:1234, remittanceId:1234, bulkPayInd:'sample data', category:'sample data', crossReference:'sample data', statChngRsnCode:'sample data', statChngDate:'2018-01-01', manualCheckFlag:'sample data', eftTransNumber:'sample data', seqCkprtId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', checkStatus:'sample data', clearDate:'2018-01-01', checkAmt:1234, companyCode:'sample data', seqVendAddress:1234, seqVendId:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data'};
      service.createCheckRegister(checkRegister).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkregisters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCheckRegister', () => {
    var id = 1;
    it('should return an Promise<CheckRegister>', () => {
      const checkRegister: CheckRegister = {bulkAmt:1234, remittanceId:1234, bulkPayInd:'sample data', category:'sample data', crossReference:'sample data', statChngRsnCode:'sample data', statChngDate:'2018-01-01', manualCheckFlag:'sample data', eftTransNumber:'sample data', seqCkprtId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', comments:'sample data', checkStatus:'sample data', clearDate:'2018-01-01', checkAmt:1234, companyCode:'sample data', seqVendAddress:1234, seqVendId:1234, checkDate:'2018-01-01', checkNumber:'sample data', bankAccountCode:'sample data'};
      service.updateCheckRegister(checkRegister, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkregisters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCheckRegister', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCheckRegister(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/checkregisters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});