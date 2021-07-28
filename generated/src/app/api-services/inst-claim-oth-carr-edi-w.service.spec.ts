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

import { InstClaimOthCarrEdiWService } from './inst-claim-oth-carr-edi-w.service';
import { InstClaimOthCarrEdiW } from '../api-models/inst-claim-oth-carr-edi-w.model'
import { InstClaimOthCarrEdiWs } from "../api-models/testing/fake-inst-claim-oth-carr-edi-w.model"

describe('InstClaimOthCarrEdiWService', () => {
  let injector: TestBed;
  let service: InstClaimOthCarrEdiWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstClaimOthCarrEdiWService]
    });
    injector = getTestBed();
    service = injector.get(InstClaimOthCarrEdiWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getInstClaimOthCarrEdiWs', () => {
    it('should return an Promise<InstClaimOthCarrEdiW[]>', () => {
      const instClaimOthCarrEdiW = [
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', originalClaimNumber:'sample data', sequenceNo:'sample data', payerName:'sample data', providerNo:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmountDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', patRelToInsured:'sample data', idNo:'sample data', groupName:'sample data', groupNo:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', ediStatus:'sample data', recInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', originalClaimNumber:'sample data', sequenceNo:'sample data', payerName:'sample data', providerNo:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmountDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', patRelToInsured:'sample data', idNo:'sample data', groupName:'sample data', groupNo:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', ediStatus:'sample data', recInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', originalClaimNumber:'sample data', sequenceNo:'sample data', payerName:'sample data', providerNo:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmountDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', patRelToInsured:'sample data', idNo:'sample data', groupName:'sample data', groupNo:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', ediStatus:'sample data', recInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getInstClaimOthCarrEdiWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimothcarrediws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(instClaimOthCarrEdiW);
    });
  });


  describe('#createInstClaimOthCarrEdiW', () => {
    var id = 1;
    it('should return an Promise<InstClaimOthCarrEdiW>', () => {
      const instClaimOthCarrEdiW: InstClaimOthCarrEdiW = {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', originalClaimNumber:'sample data', sequenceNo:'sample data', payerName:'sample data', providerNo:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmountDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', patRelToInsured:'sample data', idNo:'sample data', groupName:'sample data', groupNo:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', ediStatus:'sample data', recInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createInstClaimOthCarrEdiW(instClaimOthCarrEdiW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimothcarrediws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateInstClaimOthCarrEdiW', () => {
    var id = 1;
    it('should return an Promise<InstClaimOthCarrEdiW>', () => {
      const instClaimOthCarrEdiW: InstClaimOthCarrEdiW = {seqPrediId:1234, seqClaimId:1234, claimNumber:'sample data', originalClaimNumber:'sample data', sequenceNo:'sample data', payerName:'sample data', providerNo:'sample data', patReleaseInd:'sample data', assignBenefitsInd:'sample data', priorPayment:'sample data', estAmountDue:'sample data', insuredLastName:'sample data', insuredFirstName:'sample data', insuredMiddleName:'sample data', patRelToInsured:'sample data', idNo:'sample data', groupName:'sample data', groupNo:'sample data', treatmentAuthCode:'sample data', employmentStatusCode:'sample data', insuredEmpName:'sample data', insuredEmpLocation:'sample data', internalControlNo:'sample data', ediStatus:'sample data', recInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateInstClaimOthCarrEdiW(instClaimOthCarrEdiW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimothcarrediws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteInstClaimOthCarrEdiW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteInstClaimOthCarrEdiW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimothcarrediws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});