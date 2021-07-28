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

import { ProvContractDetRangeService } from './prov-contract-det-range.service';
import { ProvContractDetRange } from '../api-models/prov-contract-det-range.model'
import { ProvContractDetRanges } from "../api-models/testing/fake-prov-contract-det-range.model"

describe('ProvContractDetRangeService', () => {
  let injector: TestBed;
  let service: ProvContractDetRangeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvContractDetRangeService]
    });
    injector = getTestBed();
    service = injector.get(ProvContractDetRangeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvContractDetRanges', () => {
    it('should return an Promise<ProvContractDetRange[]>', () => {
      const provContractDetRange = [
       {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, detRangeSequence:1234, detValueFrom:'sample data', detValueTo:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, detRangeSequence:1234, detValueFrom:'sample data', detValueTo:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, detRangeSequence:1234, detValueFrom:'sample data', detValueTo:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProvContractDetRanges().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractdetranges/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provContractDetRange);
    });
  });


  describe('#createProvContractDetRange', () => {
    var id = 1;
    it('should return an Promise<ProvContractDetRange>', () => {
      const provContractDetRange: ProvContractDetRange = {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, detRangeSequence:1234, detValueFrom:'sample data', detValueTo:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProvContractDetRange(provContractDetRange).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractdetranges`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvContractDetRange', () => {
    var id = 1;
    it('should return an Promise<ProvContractDetRange>', () => {
      const provContractDetRange: ProvContractDetRange = {claimType:'sample data', seqProvContract:1234, seqVendId:1234, seqVendAddress:1234, detSrchOrder:1234, detSrchSequence:1234, detRangeSequence:1234, detValueFrom:'sample data', detValueTo:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProvContractDetRange(provContractDetRange, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractdetranges/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvContractDetRange', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvContractDetRange(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcontractdetranges/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});