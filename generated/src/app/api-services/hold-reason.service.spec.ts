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

import { HoldReasonService } from './hold-reason.service';
import { HoldReason } from '../api-models/hold-reason.model'
import { HoldReasons } from "../api-models/testing/fake-hold-reason.model"

describe('HoldReasonService', () => {
  let injector: TestBed;
  let service: HoldReasonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HoldReasonService]
    });
    injector = getTestBed();
    service = injector.get(HoldReasonService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getHoldReasons', () => {
    it('should return an Promise<HoldReason[]>', () => {
      const holdReason = [
       {holdReasonSequence:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', history:'sample data', reasonCode:'sample data', sourceId:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', securityCode:'sample data'},
       {holdReasonSequence:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', history:'sample data', reasonCode:'sample data', sourceId:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', securityCode:'sample data'},
       {holdReasonSequence:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', history:'sample data', reasonCode:'sample data', sourceId:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', securityCode:'sample data'}

      ];
      service.getHoldReasons().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/holdreasons/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(holdReason);
    });
  });


  describe('#createHoldReason', () => {
    var id = 1;
    it('should return an Promise<HoldReason>', () => {
      const holdReason: HoldReason = {holdReasonSequence:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', history:'sample data', reasonCode:'sample data', sourceId:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', securityCode:'sample data'};
      service.createHoldReason(holdReason).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holdreasons`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateHoldReason', () => {
    var id = 1;
    it('should return an Promise<HoldReason>', () => {
      const holdReason: HoldReason = {holdReasonSequence:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', history:'sample data', reasonCode:'sample data', sourceId:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', securityCode:'sample data'};
      service.updateHoldReason(holdReason, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holdreasons/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteHoldReason', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteHoldReason(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/holdreasons/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});