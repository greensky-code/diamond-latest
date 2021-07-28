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

import { DentalPatientLiabilityService } from './dental-patient-liability.service';
import { DentalPatientLiability } from '../api-models/dental-patient-liability.model'
import { DentalPatientLiabilitys } from "../api-models/testing/fake-dental-patient-liability.model"

describe('DentalPatientLiabilityService', () => {
  let injector: TestBed;
  let service: DentalPatientLiabilityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DentalPatientLiabilityService]
    });
    injector = getTestBed();
    service = injector.get(DentalPatientLiabilityService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDentalPatientLiabilitys', () => {
    it('should return an Promise<DentalPatientLiability[]>', () => {
      const dentalPatientLiability = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDentalPatientLiabilitys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/dentalpatientliabilitys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(dentalPatientLiability);
    });
  });


  describe('#createDentalPatientLiability', () => {
    var id = 1;
    it('should return an Promise<DentalPatientLiability>', () => {
      const dentalPatientLiability: DentalPatientLiability = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDentalPatientLiability(dentalPatientLiability).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalpatientliabilitys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDentalPatientLiability', () => {
    var id = 1;
    it('should return an Promise<DentalPatientLiability>', () => {
      const dentalPatientLiability: DentalPatientLiability = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', ruleType:'sample data', ruleId:'sample data', liabilityAmt:1234, liabilityReason:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDentalPatientLiability(dentalPatientLiability, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalpatientliabilitys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDentalPatientLiability', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDentalPatientLiability(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/dentalpatientliabilitys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});