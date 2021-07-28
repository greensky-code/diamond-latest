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

import { ProvCredentialService } from './prov-credential.service';
import { ProvCredential } from '../api-models/prov-credential.model'
import { ProvCredentials } from "../api-models/testing/fake-prov-credential.model"

describe('ProvCredentialService', () => {
  let injector: TestBed;
  let service: ProvCredentialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProvCredentialService]
    });
    injector = getTestBed();
    service = injector.get(ProvCredentialService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProvCredentials', () => {
    it('should return an Promise<ProvCredential[]>', () => {
      const provCredential = [
       {seqProvCredential:1234, seqProvId:1234, license1:'sample data', state1:'sample data', license1ExpireDt:'2018-01-01', license2:'sample data', state2:'sample data', license2ExpireDt:'2018-01-01', deaLicense:'sample data', deaExpireDate:'2018-01-01', insuranceCarrier1:'sample data', insurancePolicy1:'sample data', effectiveFrom1:'2018-01-01', effectiveTo1:'2018-01-01', claimLimit1:1234, aggregLimit1:1234, policyDescr1:'sample data', insuranceCarrier2:'sample data', insurancePolicy2:'sample data', effectiveFrom2:'2018-01-01', effectiveTo2:'2018-01-01', claimLimit2:1234, aggregateLimit2:1234, policyDescr2:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', comments:'sample data', medicalSchool:'sample data', medSchoolDate:'2018-01-01', internship:'sample data', internshipDate:'2018-01-01', residency:'sample data', residencyDate:'2018-01-01', specialtyBoard1:'sample data', board1FromDate:'2018-01-01', board1ToDate:'2018-01-01', specialtyBoard2:'sample data', board2FromDate:'2018-01-01', board2ToDate:'2018-01-01', includeInDir:'sample data', lastPrintDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country1:'sample data', country2:'sample data'},
       {seqProvCredential:1234, seqProvId:1234, license1:'sample data', state1:'sample data', license1ExpireDt:'2018-01-01', license2:'sample data', state2:'sample data', license2ExpireDt:'2018-01-01', deaLicense:'sample data', deaExpireDate:'2018-01-01', insuranceCarrier1:'sample data', insurancePolicy1:'sample data', effectiveFrom1:'2018-01-01', effectiveTo1:'2018-01-01', claimLimit1:1234, aggregLimit1:1234, policyDescr1:'sample data', insuranceCarrier2:'sample data', insurancePolicy2:'sample data', effectiveFrom2:'2018-01-01', effectiveTo2:'2018-01-01', claimLimit2:1234, aggregateLimit2:1234, policyDescr2:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', comments:'sample data', medicalSchool:'sample data', medSchoolDate:'2018-01-01', internship:'sample data', internshipDate:'2018-01-01', residency:'sample data', residencyDate:'2018-01-01', specialtyBoard1:'sample data', board1FromDate:'2018-01-01', board1ToDate:'2018-01-01', specialtyBoard2:'sample data', board2FromDate:'2018-01-01', board2ToDate:'2018-01-01', includeInDir:'sample data', lastPrintDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country1:'sample data', country2:'sample data'},
       {seqProvCredential:1234, seqProvId:1234, license1:'sample data', state1:'sample data', license1ExpireDt:'2018-01-01', license2:'sample data', state2:'sample data', license2ExpireDt:'2018-01-01', deaLicense:'sample data', deaExpireDate:'2018-01-01', insuranceCarrier1:'sample data', insurancePolicy1:'sample data', effectiveFrom1:'2018-01-01', effectiveTo1:'2018-01-01', claimLimit1:1234, aggregLimit1:1234, policyDescr1:'sample data', insuranceCarrier2:'sample data', insurancePolicy2:'sample data', effectiveFrom2:'2018-01-01', effectiveTo2:'2018-01-01', claimLimit2:1234, aggregateLimit2:1234, policyDescr2:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', comments:'sample data', medicalSchool:'sample data', medSchoolDate:'2018-01-01', internship:'sample data', internshipDate:'2018-01-01', residency:'sample data', residencyDate:'2018-01-01', specialtyBoard1:'sample data', board1FromDate:'2018-01-01', board1ToDate:'2018-01-01', specialtyBoard2:'sample data', board2FromDate:'2018-01-01', board2ToDate:'2018-01-01', includeInDir:'sample data', lastPrintDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country1:'sample data', country2:'sample data'}

      ];
      service.getProvCredentials().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/provcredentials/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(provCredential);
    });
  });


  describe('#createProvCredential', () => {
    var id = 1;
    it('should return an Promise<ProvCredential>', () => {
      const provCredential: ProvCredential = {seqProvCredential:1234, seqProvId:1234, license1:'sample data', state1:'sample data', license1ExpireDt:'2018-01-01', license2:'sample data', state2:'sample data', license2ExpireDt:'2018-01-01', deaLicense:'sample data', deaExpireDate:'2018-01-01', insuranceCarrier1:'sample data', insurancePolicy1:'sample data', effectiveFrom1:'2018-01-01', effectiveTo1:'2018-01-01', claimLimit1:1234, aggregLimit1:1234, policyDescr1:'sample data', insuranceCarrier2:'sample data', insurancePolicy2:'sample data', effectiveFrom2:'2018-01-01', effectiveTo2:'2018-01-01', claimLimit2:1234, aggregateLimit2:1234, policyDescr2:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', comments:'sample data', medicalSchool:'sample data', medSchoolDate:'2018-01-01', internship:'sample data', internshipDate:'2018-01-01', residency:'sample data', residencyDate:'2018-01-01', specialtyBoard1:'sample data', board1FromDate:'2018-01-01', board1ToDate:'2018-01-01', specialtyBoard2:'sample data', board2FromDate:'2018-01-01', board2ToDate:'2018-01-01', includeInDir:'sample data', lastPrintDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country1:'sample data', country2:'sample data'};
      service.createProvCredential(provCredential).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcredentials`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProvCredential', () => {
    var id = 1;
    it('should return an Promise<ProvCredential>', () => {
      const provCredential: ProvCredential = {seqProvCredential:1234, seqProvId:1234, license1:'sample data', state1:'sample data', license1ExpireDt:'2018-01-01', license2:'sample data', state2:'sample data', license2ExpireDt:'2018-01-01', deaLicense:'sample data', deaExpireDate:'2018-01-01', insuranceCarrier1:'sample data', insurancePolicy1:'sample data', effectiveFrom1:'2018-01-01', effectiveTo1:'2018-01-01', claimLimit1:1234, aggregLimit1:1234, policyDescr1:'sample data', insuranceCarrier2:'sample data', insurancePolicy2:'sample data', effectiveFrom2:'2018-01-01', effectiveTo2:'2018-01-01', claimLimit2:1234, aggregateLimit2:1234, policyDescr2:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', comments:'sample data', medicalSchool:'sample data', medSchoolDate:'2018-01-01', internship:'sample data', internshipDate:'2018-01-01', residency:'sample data', residencyDate:'2018-01-01', specialtyBoard1:'sample data', board1FromDate:'2018-01-01', board1ToDate:'2018-01-01', specialtyBoard2:'sample data', board2FromDate:'2018-01-01', board2ToDate:'2018-01-01', includeInDir:'sample data', lastPrintDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', country1:'sample data', country2:'sample data'};
      service.updateProvCredential(provCredential, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcredentials/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProvCredential', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProvCredential(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/provcredentials/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});