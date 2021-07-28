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

import { ClaimSubmittedDataDtlService } from './claim-submitted-data-dtl.service';
import { ClaimSubmittedDataDtl } from '../api-models/claim-submitted-data-dtl.model'
import { ClaimSubmittedDataDtls } from "../api-models/testing/fake-claim-submitted-data-dtl.model"

describe('ClaimSubmittedDataDtlService', () => {
  let injector: TestBed;
  let service: ClaimSubmittedDataDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimSubmittedDataDtlService]
    });
    injector = getTestBed();
    service = injector.get(ClaimSubmittedDataDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimSubmittedDataDtls', () => {
    it('should return an Promise<ClaimSubmittedDataDtl[]>', () => {
      const claimSubmittedDataDtl = [
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', procedureCode:'sample data', alternateProcCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origNetAmt:1234, netAmtBalNotPaid:1234, userDefined1:'sample data', userDefined2:'sample data', userDefined3:1234, userDefined4:1234},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', procedureCode:'sample data', alternateProcCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origNetAmt:1234, netAmtBalNotPaid:1234, userDefined1:'sample data', userDefined2:'sample data', userDefined3:1234, userDefined4:1234},
       {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', procedureCode:'sample data', alternateProcCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origNetAmt:1234, netAmtBalNotPaid:1234, userDefined1:'sample data', userDefined2:'sample data', userDefined3:1234, userDefined4:1234}

      ];
      service.getClaimSubmittedDataDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatadtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimSubmittedDataDtl);
    });
  });


  describe('#createClaimSubmittedDataDtl', () => {
    var id = 1;
    it('should return an Promise<ClaimSubmittedDataDtl>', () => {
      const claimSubmittedDataDtl: ClaimSubmittedDataDtl = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', procedureCode:'sample data', alternateProcCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origNetAmt:1234, netAmtBalNotPaid:1234, userDefined1:'sample data', userDefined2:'sample data', userDefined3:1234, userDefined4:1234};
      service.createClaimSubmittedDataDtl(claimSubmittedDataDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatadtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimSubmittedDataDtl', () => {
    var id = 1;
    it('should return an Promise<ClaimSubmittedDataDtl>', () => {
      const claimSubmittedDataDtl: ClaimSubmittedDataDtl = {seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', procedureCode:'sample data', alternateProcCode:'sample data', procedureModifier1:'sample data', procedureModifier2:'sample data', procedureModifier3:'sample data', procedureModifier4:'sample data', placeOfService:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origNetAmt:1234, netAmtBalNotPaid:1234, userDefined1:'sample data', userDefined2:'sample data', userDefined3:1234, userDefined4:1234};
      service.updateClaimSubmittedDataDtl(claimSubmittedDataDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatadtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimSubmittedDataDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimSubmittedDataDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimsubmitteddatadtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});