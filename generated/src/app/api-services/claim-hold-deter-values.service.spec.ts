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

import { ClaimHoldDeterValuesService } from './claim-hold-deter-values.service';
import { ClaimHoldDeterValues } from '../api-models/claim-hold-deter-values.model'
import { ClaimHoldDeterValueses } from "../api-models/testing/fake-claim-hold-deter-values.model"

describe('ClaimHoldDeterValuesService', () => {
  let injector: TestBed;
  let service: ClaimHoldDeterValuesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimHoldDeterValuesService]
    });
    injector = getTestBed();
    service = injector.get(ClaimHoldDeterValuesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimHoldDeterValueses', () => {
    it('should return an Promise<ClaimHoldDeterValues[]>', () => {
      const claimHoldDeterValues = [
       {seqClhldRule:1234, determinantColumnNo:1234, determinantValueNo:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClhldRule:1234, determinantColumnNo:1234, determinantValueNo:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClhldRule:1234, determinantColumnNo:1234, determinantValueNo:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getClaimHoldDeterValueses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddetervalueses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimHoldDeterValues);
    });
  });


  describe('#createClaimHoldDeterValues', () => {
    var id = 1;
    it('should return an Promise<ClaimHoldDeterValues>', () => {
      const claimHoldDeterValues: ClaimHoldDeterValues = {seqClhldRule:1234, determinantColumnNo:1234, determinantValueNo:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createClaimHoldDeterValues(claimHoldDeterValues).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddetervalueses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimHoldDeterValues', () => {
    var id = 1;
    it('should return an Promise<ClaimHoldDeterValues>', () => {
      const claimHoldDeterValues: ClaimHoldDeterValues = {seqClhldRule:1234, determinantColumnNo:1234, determinantValueNo:1234, detFromValue:'sample data', detThruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateClaimHoldDeterValues(claimHoldDeterValues, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddetervalueses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimHoldDeterValues', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimHoldDeterValues(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimholddetervalueses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});