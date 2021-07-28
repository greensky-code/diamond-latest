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

import { ProfsvcPatientLiabilityService } from './profsvc-patient-liability.service';
import { ProfsvcPatientLiability } from '../api-models/profsvc-patient-liability.model'
import { ProfsvcPatientLiabilitys } from "../api-models/testing/fake-profsvc-patient-liability.model"

describe('ProfsvcPatientLiabilityService', () => {
  let injector: TestBed;
  let service: ProfsvcPatientLiabilityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcPatientLiabilityService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcPatientLiabilityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcPatientLiabilitys', () => {
    it('should return an Promise<ProfsvcPatientLiability[]>', () => {
      const profsvcPatientLiability = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getProfsvcPatientLiabilitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabilitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcPatientLiability);
    });
  });


  describe('#createProfsvcPatientLiability', () => {
    var id = 1;
    it('should return an Promise<ProfsvcPatientLiability>', () => {
      const profsvcPatientLiability: ProfsvcPatientLiability = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createProfsvcPatientLiability(profsvcPatientLiability).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabilitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcPatientLiability', () => {
    var id = 1;
    it('should return an Promise<ProfsvcPatientLiability>', () => {
      const profsvcPatientLiability: ProfsvcPatientLiability = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateProfsvcPatientLiability(profsvcPatientLiability, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabilitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcPatientLiability', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcPatientLiability(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcpatientliabilitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});