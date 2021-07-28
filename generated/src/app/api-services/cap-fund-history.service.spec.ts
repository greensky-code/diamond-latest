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

import { CapFundHistoryService } from './cap-fund-history.service';
import { CapFundHistory } from '../api-models/cap-fund-history.model'
import { CapFundHistorys } from "../api-models/testing/fake-cap-fund-history.model"

describe('CapFundHistoryService', () => {
  let injector: TestBed;
  let service: CapFundHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapFundHistoryService]
    });
    injector = getTestBed();
    service = injector.get(CapFundHistoryService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapFundHistorys', () => {
    it('should return an Promise<CapFundHistory[]>', () => {
      const capFundHistory = [
       {seqCfdstId:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunFromDate:'2018-01-01', capFundRunMonth:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcFromDate:'2018-01-01', detailSvcToDate:'2018-01-01', seqProvId:1234, seqMembId:1234, billedAmt:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, capFundWithholdAmt:1234, netAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', totalUnits:1234, claimNumber:'sample data', claimStatus:'sample data', processingStatus:'sample data', capFundStatus:1234, securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {seqCfdstId:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunFromDate:'2018-01-01', capFundRunMonth:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcFromDate:'2018-01-01', detailSvcToDate:'2018-01-01', seqProvId:1234, seqMembId:1234, billedAmt:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, capFundWithholdAmt:1234, netAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', totalUnits:1234, claimNumber:'sample data', claimStatus:'sample data', processingStatus:'sample data', capFundStatus:1234, securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {seqCfdstId:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunFromDate:'2018-01-01', capFundRunMonth:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcFromDate:'2018-01-01', detailSvcToDate:'2018-01-01', seqProvId:1234, seqMembId:1234, billedAmt:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, capFundWithholdAmt:1234, netAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', totalUnits:1234, claimNumber:'sample data', claimStatus:'sample data', processingStatus:'sample data', capFundStatus:1234, securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'}

      ];
      service.getCapFundHistorys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhistorys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capFundHistory);
    });
  });


  describe('#createCapFundHistory', () => {
    var id = 1;
    it('should return an Promise<CapFundHistory>', () => {
      const capFundHistory: CapFundHistory = {seqCfdstId:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunFromDate:'2018-01-01', capFundRunMonth:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcFromDate:'2018-01-01', detailSvcToDate:'2018-01-01', seqProvId:1234, seqMembId:1234, billedAmt:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, capFundWithholdAmt:1234, netAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', totalUnits:1234, claimNumber:'sample data', claimStatus:'sample data', processingStatus:'sample data', capFundStatus:1234, securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.createCapFundHistory(capFundHistory).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhistorys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapFundHistory', () => {
    var id = 1;
    it('should return an Promise<CapFundHistory>', () => {
      const capFundHistory: CapFundHistory = {seqCfdstId:1234, capFundModelId:'sample data', capFundSubModelId:'sample data', capFundRunFromDate:'2018-01-01', capFundRunMonth:'2018-01-01', seqClaimId:1234, lineNumber:1234, subLineCode:'sample data', detailSvcFromDate:'2018-01-01', detailSvcToDate:'2018-01-01', seqProvId:1234, seqMembId:1234, billedAmt:1234, allowedAmt:1234, notCoveredAmt:1234, copayment1Amt:1234, copayment2Amt:1234, deductibleAmt:1234, otherCarrierAmt:1234, withholdAmt:1234, capFundWithholdAmt:1234, netAmt:1234, procedureCode:'sample data', procedureModifier:'sample data', totalUnits:1234, claimNumber:'sample data', claimStatus:'sample data', processingStatus:'sample data', capFundStatus:1234, securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.updateCapFundHistory(capFundHistory, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhistorys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapFundHistory', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapFundHistory(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfundhistorys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});