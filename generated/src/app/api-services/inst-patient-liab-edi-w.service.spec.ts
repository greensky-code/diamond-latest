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

import { InstPatientLiabEdiWService } from './inst-patient-liab-edi-w.service';
import { InstPatientLiabEdiW } from '../api-models/inst-patient-liab-edi-w.model'
import { InstPatientLiabEdiWs } from "../api-models/testing/fake-inst-patient-liab-edi-w.model"

describe('InstPatientLiabEdiWService', () => {
  let injector: TestBed;
  let service: InstPatientLiabEdiWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstPatientLiabEdiWService]
    });
    injector = getTestBed();
    service = injector.get(InstPatientLiabEdiWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getInstPatientLiabEdiWs', () => {
    it('should return an Promise<InstPatientLiabEdiW[]>', () => {
      const instPatientLiabEdiW = [
       {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getInstPatientLiabEdiWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabediws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(instPatientLiabEdiW);
    });
  });


  describe('#createInstPatientLiabEdiW', () => {
    var id = 1;
    it('should return an Promise<InstPatientLiabEdiW>', () => {
      const instPatientLiabEdiW: InstPatientLiabEdiW = {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createInstPatientLiabEdiW(instPatientLiabEdiW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabediws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateInstPatientLiabEdiW', () => {
    var id = 1;
    it('should return an Promise<InstPatientLiabEdiW>', () => {
      const instPatientLiabEdiW: InstPatientLiabEdiW = {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateInstPatientLiabEdiW(instPatientLiabEdiW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabediws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteInstPatientLiabEdiW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteInstPatientLiabEdiW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instpatientliabediws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});