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

import { PmbCombinedGrpSumService } from './pmb-combined-grp-sum.service';
import { PmbCombinedGrpSum } from '../api-models/pmb-combined-grp-sum.model'
import { PmbCombinedGrpSums } from "../api-models/testing/fake-pmb-combined-grp-sum.model"

describe('PmbCombinedGrpSumService', () => {
  let injector: TestBed;
  let service: PmbCombinedGrpSumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbCombinedGrpSumService]
    });
    injector = getTestBed();
    service = injector.get(PmbCombinedGrpSumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbCombinedGrpSums', () => {
    it('should return an Promise<PmbCombinedGrpSum[]>', () => {
      const pmbCombinedGrpSum = [
       {seqGroupId:1234, periodFromDate:'2018-01-01', periodThruDate:'2018-01-01', billThruRequestDate:'2018-01-01', seqParentId:1234, totalBalanceForward:1234, totalNewChargeAmt:1234, totalAdjustments:1234, totalPayments:1234, totalBalance:1234, commonBillingDateFlg:'sample data', billType:'sample data', supplementalBillSeqNumber:1234},
       {seqGroupId:1234, periodFromDate:'2018-01-01', periodThruDate:'2018-01-01', billThruRequestDate:'2018-01-01', seqParentId:1234, totalBalanceForward:1234, totalNewChargeAmt:1234, totalAdjustments:1234, totalPayments:1234, totalBalance:1234, commonBillingDateFlg:'sample data', billType:'sample data', supplementalBillSeqNumber:1234},
       {seqGroupId:1234, periodFromDate:'2018-01-01', periodThruDate:'2018-01-01', billThruRequestDate:'2018-01-01', seqParentId:1234, totalBalanceForward:1234, totalNewChargeAmt:1234, totalAdjustments:1234, totalPayments:1234, totalBalance:1234, commonBillingDateFlg:'sample data', billType:'sample data', supplementalBillSeqNumber:1234}

      ];
      service.getPmbCombinedGrpSums().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcombinedgrpsums/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbCombinedGrpSum);
    });
  });


  describe('#createPmbCombinedGrpSum', () => {
    var id = 1;
    it('should return an Promise<PmbCombinedGrpSum>', () => {
      const pmbCombinedGrpSum: PmbCombinedGrpSum = {seqGroupId:1234, periodFromDate:'2018-01-01', periodThruDate:'2018-01-01', billThruRequestDate:'2018-01-01', seqParentId:1234, totalBalanceForward:1234, totalNewChargeAmt:1234, totalAdjustments:1234, totalPayments:1234, totalBalance:1234, commonBillingDateFlg:'sample data', billType:'sample data', supplementalBillSeqNumber:1234};
      service.createPmbCombinedGrpSum(pmbCombinedGrpSum).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcombinedgrpsums`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbCombinedGrpSum', () => {
    var id = 1;
    it('should return an Promise<PmbCombinedGrpSum>', () => {
      const pmbCombinedGrpSum: PmbCombinedGrpSum = {seqGroupId:1234, periodFromDate:'2018-01-01', periodThruDate:'2018-01-01', billThruRequestDate:'2018-01-01', seqParentId:1234, totalBalanceForward:1234, totalNewChargeAmt:1234, totalAdjustments:1234, totalPayments:1234, totalBalance:1234, commonBillingDateFlg:'sample data', billType:'sample data', supplementalBillSeqNumber:1234};
      service.updatePmbCombinedGrpSum(pmbCombinedGrpSum, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcombinedgrpsums/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbCombinedGrpSum', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbCombinedGrpSum(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbcombinedgrpsums/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});