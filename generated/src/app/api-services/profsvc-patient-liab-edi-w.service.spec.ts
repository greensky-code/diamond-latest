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

import { ProfsvcPatientLiabEdiWService } from './profsvc-patient-liab-edi-w.service';
import { ProfsvcPatientLiabEdiW } from '../api-models/profsvc-patient-liab-edi-w.model'
import { ProfsvcPatientLiabEdiWs } from "../api-models/testing/fake-profsvc-patient-liab-edi-w.model"

describe('ProfsvcPatientLiabEdiWService', () => {
  let injector: TestBed;
  let service: ProfsvcPatientLiabEdiWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcPatientLiabEdiWService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcPatientLiabEdiWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcPatientLiabEdiWs', () => {
    it('should return an Promise<ProfsvcPatientLiabEdiW[]>', () => {
      const profsvcPatientLiabEdiW = [
       {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProfsvcPatientLiabEdiWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabediws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcPatientLiabEdiW);
    });
  });


  describe('#createProfsvcPatientLiabEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcPatientLiabEdiW>', () => {
      const profsvcPatientLiabEdiW: ProfsvcPatientLiabEdiW = {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProfsvcPatientLiabEdiW(profsvcPatientLiabEdiW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabediws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcPatientLiabEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcPatientLiabEdiW>', () => {
      const profsvcPatientLiabEdiW: ProfsvcPatientLiabEdiW = {seqPrediId:1234, seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProfsvcPatientLiabEdiW(profsvcPatientLiabEdiW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabediws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcPatientLiabEdiW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcPatientLiabEdiW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabediws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});