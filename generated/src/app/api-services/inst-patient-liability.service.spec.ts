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

import { InstPatientLiabilityService } from './inst-patient-liability.service';
import { InstPatientLiability } from '../api-models/inst-patient-liability.model'
import { InstPatientLiabilitys } from "../api-models/testing/fake-inst-patient-liability.model"

describe('InstPatientLiabilityService', () => {
  let injector: TestBed;
  let service: InstPatientLiabilityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstPatientLiabilityService]
    });
    injector = getTestBed();
    service = injector.get(InstPatientLiabilityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getInstPatientLiabilitys', () => {
    it('should return an Promise<InstPatientLiability[]>', () => {
      const instPatientLiability = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getInstPatientLiabilitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabilitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(instPatientLiability);
    });
  });


  describe('#createInstPatientLiability', () => {
    var id = 1;
    it('should return an Promise<InstPatientLiability>', () => {
      const instPatientLiability: InstPatientLiability = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createInstPatientLiability(instPatientLiability).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabilitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateInstPatientLiability', () => {
    var id = 1;
    it('should return an Promise<InstPatientLiability>', () => {
      const instPatientLiability: InstPatientLiability = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateInstPatientLiability(instPatientLiability, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabilitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteInstPatientLiability', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteInstPatientLiability(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabilitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});