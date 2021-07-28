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

import { VbiCheckRegisterService } from './vbi-check-register.service';
import { VbiCheckRegister } from '../api-models/vbi-check-register.model'
import { VbiCheckRegisters } from "../api-models/testing/fake-vbi-check-register.model"

describe('VbiCheckRegisterService', () => {
  let injector: TestBed;
  let service: VbiCheckRegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VbiCheckRegisterService]
    });
    injector = getTestBed();
    service = injector.get(VbiCheckRegisterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getVbiCheckRegisters', () => {
    it('should return an Promise<VbiCheckRegister[]>', () => {
      const vbiCheckRegister = [
       {bankAccountCode:'sample data', checkNumber:'sample data', checkDate:'2018-01-01', seqClaimId:'sample data', seqVendId:1234, seqVendAddress:1234, companyCode:'sample data', checkAmt:1234, clearDate:'2018-01-01', checkStatus:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCkprtId:1234, eftTransNumber:'sample data', manualCheckFlag:'sample data', statChngDate:'2018-01-01', statChngRsnCode:'sample data', crossReference:'sample data', category:'sample data', fileType:'sample data'},
       {bankAccountCode:'sample data', checkNumber:'sample data', checkDate:'2018-01-01', seqClaimId:'sample data', seqVendId:1234, seqVendAddress:1234, companyCode:'sample data', checkAmt:1234, clearDate:'2018-01-01', checkStatus:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCkprtId:1234, eftTransNumber:'sample data', manualCheckFlag:'sample data', statChngDate:'2018-01-01', statChngRsnCode:'sample data', crossReference:'sample data', category:'sample data', fileType:'sample data'},
       {bankAccountCode:'sample data', checkNumber:'sample data', checkDate:'2018-01-01', seqClaimId:'sample data', seqVendId:1234, seqVendAddress:1234, companyCode:'sample data', checkAmt:1234, clearDate:'2018-01-01', checkStatus:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCkprtId:1234, eftTransNumber:'sample data', manualCheckFlag:'sample data', statChngDate:'2018-01-01', statChngRsnCode:'sample data', crossReference:'sample data', category:'sample data', fileType:'sample data'}

      ];
      service.getVbiCheckRegisters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/vbicheckregisters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(vbiCheckRegister);
    });
  });


  describe('#createVbiCheckRegister', () => {
    var id = 1;
    it('should return an Promise<VbiCheckRegister>', () => {
      const vbiCheckRegister: VbiCheckRegister = {bankAccountCode:'sample data', checkNumber:'sample data', checkDate:'2018-01-01', seqClaimId:'sample data', seqVendId:1234, seqVendAddress:1234, companyCode:'sample data', checkAmt:1234, clearDate:'2018-01-01', checkStatus:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCkprtId:1234, eftTransNumber:'sample data', manualCheckFlag:'sample data', statChngDate:'2018-01-01', statChngRsnCode:'sample data', crossReference:'sample data', category:'sample data', fileType:'sample data'};
      service.createVbiCheckRegister(vbiCheckRegister).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vbicheckregisters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateVbiCheckRegister', () => {
    var id = 1;
    it('should return an Promise<VbiCheckRegister>', () => {
      const vbiCheckRegister: VbiCheckRegister = {bankAccountCode:'sample data', checkNumber:'sample data', checkDate:'2018-01-01', seqClaimId:'sample data', seqVendId:1234, seqVendAddress:1234, companyCode:'sample data', checkAmt:1234, clearDate:'2018-01-01', checkStatus:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqCkprtId:1234, eftTransNumber:'sample data', manualCheckFlag:'sample data', statChngDate:'2018-01-01', statChngRsnCode:'sample data', crossReference:'sample data', category:'sample data', fileType:'sample data'};
      service.updateVbiCheckRegister(vbiCheckRegister, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vbicheckregisters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteVbiCheckRegister', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteVbiCheckRegister(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/vbicheckregisters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});