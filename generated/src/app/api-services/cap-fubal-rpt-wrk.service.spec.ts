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

import { CapFubalRptWrkService } from './cap-fubal-rpt-wrk.service';
import { CapFubalRptWrk } from '../api-models/cap-fubal-rpt-wrk.model'
import { CapFubalRptWrks } from "../api-models/testing/fake-cap-fubal-rpt-wrk.model"

describe('CapFubalRptWrkService', () => {
  let injector: TestBed;
  let service: CapFubalRptWrkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapFubalRptWrkService]
    });
    injector = getTestBed();
    service = injector.get(CapFubalRptWrkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapFubalRptWrks', () => {
    it('should return an Promise<CapFubalRptWrk[]>', () => {
      const capFubalRptWrk = [
       {seqCapFubalRptWrk:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', poolId1:'sample data', capFundBudgetAmt1:1234, encoutersClaimsAmt1:1234, ibnrEstAmt1:1234, stoplossReimburseAmt1:1234, capWithholdAmt1:1234, ffsWithholdAmt1:1234, accumCapFundBdgtAmt1:1234, accumCapEncClaimsAmt1:1234, accumCapIbnrEstAmt1:1234, accumCapStplssReimbAmt1:1234, accumCapWithholdAmt1:1234, accumCapFfsWithholdAmt1:1234, poolId2:'sample data', capFundBudgetAmt2:1234, encoutersClaimsAmt2:1234, ibnrEstAmt2:1234, stoplossReimburseAmt2:1234, capWithholdAmt2:1234, ffsWithholdAmt2:1234, accumCapFundBdgtAmt2:1234, accumCapEncClaimsAmt2:1234, accumCapIbnrEstAmt2:1234, accumCapStplssReimbAmt2:1234, accumCapCapWithholdAmt2:1234, accumCapFfsWithholdAmt2:1234, poolId3:'sample data', capFundBudgetAmt3:1234, encoutersClaimsAmt3:1234, ibnrEstAmt3:1234, stoplossReimburseAmt3:1234, capWithholdAmt3:1234, ffsWithholdAmt3:1234, accumCapFundBdgtAmt3:1234, accumCapEncClaimsAmt3:1234, accumCapIbnrEstAmt3:1234, accumCapStplssReimbAmt3:1234, accumCapCapWithholdAmt3:1234, accumCapFfsWithholdAmt3:1234, poolId4:'sample data', capFundBudgetAmt4:1234, encoutersClaimsAmt4:1234, ibnrEstAmt4:1234, stoplossReimburseAmt4:1234, capWithholdAmt4:1234, ffsWithholdAmt4:1234, accumCapFundBdgtAmt4:1234, accumCapEncClaimsAmt4:1234, accumCapIbnrEstAmt4:1234, accumCapStplssReimbAmt4:1234, accumCapCapWithholdAmt4:1234, accumCapFfsWithholdAmt4:1234, poolId5:'sample data', capFundBudgetAmt5:1234, encoutersClaimsAmt5:1234, ibnrEstAmt5:1234, stoplossReimburseAmt5:1234, capWithholdAmt5:1234, ffsWithholdAmt5:1234, accumCapFundBdgtAmt5:1234, accumCapEncClaimsAmt5:1234, accumCapIbnrEstAmt5:1234, accumCapStplssReimbAmt5:1234, accumCapCapWithholdAmt5:1234, accumCapFfsWithholdAmt5:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', adjustPmpm1:1234, adjustPmpm2:1234, adjustPmpm3:1234, adjustPmpm4:1234, adjustPmpm5:1234, adjustFfsWhld1:1234, adjustFfsWhld2:1234, adjustFfsWhld3:1234, adjustFfsWhld4:1234, adjustFfsWhld5:1234, adjustWhld1:1234, adjustWhld2:1234, adjustWhld3:1234, adjustWhld4:1234, adjustWhld5:1234, adjustDed1:1234, adjustDed2:1234, adjustDed3:1234, adjustDed4:1234, adjustDed5:1234, adjustStoploss1:1234, adjustStoploss2:1234, adjustStoploss3:1234, adjustStoploss4:1234, adjustStoploss5:1234, adjustOther1:1234, adjustOther2:1234, adjustOther3:1234, adjustOther4:1234, adjustOther5:1234, accumAdjustPmpm1:1234, accumAdjustPmpm2:1234, accumAdjustPmpm3:1234, accumAdjustPmpm4:1234, accumAdjustPmpm5:1234, accumAdjustFfsWhld1:1234, accumAdjustFfsWhld2:1234, accumAdjustFfsWhld3:1234, accumAdjustFfsWhld4:1234, accumAdjustFfsWhld5:1234, accumAdjustWhld1:1234, accumAdjustWhld2:1234, accumAdjustWhld3:1234, accumAdjustWhld4:1234, accumAdjustWhld5:1234, accumAdjustDed1:1234, accumAdjustDed2:1234, accumAdjustDed3:1234, accumAdjustDed4:1234, accumAdjustDed5:1234, accumAdjustStoploss1:1234, accumAdjustStoploss2:1234, accumAdjustStoploss3:1234, accumAdjustStoploss4:1234, accumAdjustStoploss5:1234, accumAdjustOther1:1234, accumAdjustOther2:1234, accumAdjustOther3:1234, accumAdjustOther4:1234, accumAdjustOther5:1234},
       {seqCapFubalRptWrk:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', poolId1:'sample data', capFundBudgetAmt1:1234, encoutersClaimsAmt1:1234, ibnrEstAmt1:1234, stoplossReimburseAmt1:1234, capWithholdAmt1:1234, ffsWithholdAmt1:1234, accumCapFundBdgtAmt1:1234, accumCapEncClaimsAmt1:1234, accumCapIbnrEstAmt1:1234, accumCapStplssReimbAmt1:1234, accumCapWithholdAmt1:1234, accumCapFfsWithholdAmt1:1234, poolId2:'sample data', capFundBudgetAmt2:1234, encoutersClaimsAmt2:1234, ibnrEstAmt2:1234, stoplossReimburseAmt2:1234, capWithholdAmt2:1234, ffsWithholdAmt2:1234, accumCapFundBdgtAmt2:1234, accumCapEncClaimsAmt2:1234, accumCapIbnrEstAmt2:1234, accumCapStplssReimbAmt2:1234, accumCapCapWithholdAmt2:1234, accumCapFfsWithholdAmt2:1234, poolId3:'sample data', capFundBudgetAmt3:1234, encoutersClaimsAmt3:1234, ibnrEstAmt3:1234, stoplossReimburseAmt3:1234, capWithholdAmt3:1234, ffsWithholdAmt3:1234, accumCapFundBdgtAmt3:1234, accumCapEncClaimsAmt3:1234, accumCapIbnrEstAmt3:1234, accumCapStplssReimbAmt3:1234, accumCapCapWithholdAmt3:1234, accumCapFfsWithholdAmt3:1234, poolId4:'sample data', capFundBudgetAmt4:1234, encoutersClaimsAmt4:1234, ibnrEstAmt4:1234, stoplossReimburseAmt4:1234, capWithholdAmt4:1234, ffsWithholdAmt4:1234, accumCapFundBdgtAmt4:1234, accumCapEncClaimsAmt4:1234, accumCapIbnrEstAmt4:1234, accumCapStplssReimbAmt4:1234, accumCapCapWithholdAmt4:1234, accumCapFfsWithholdAmt4:1234, poolId5:'sample data', capFundBudgetAmt5:1234, encoutersClaimsAmt5:1234, ibnrEstAmt5:1234, stoplossReimburseAmt5:1234, capWithholdAmt5:1234, ffsWithholdAmt5:1234, accumCapFundBdgtAmt5:1234, accumCapEncClaimsAmt5:1234, accumCapIbnrEstAmt5:1234, accumCapStplssReimbAmt5:1234, accumCapCapWithholdAmt5:1234, accumCapFfsWithholdAmt5:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', adjustPmpm1:1234, adjustPmpm2:1234, adjustPmpm3:1234, adjustPmpm4:1234, adjustPmpm5:1234, adjustFfsWhld1:1234, adjustFfsWhld2:1234, adjustFfsWhld3:1234, adjustFfsWhld4:1234, adjustFfsWhld5:1234, adjustWhld1:1234, adjustWhld2:1234, adjustWhld3:1234, adjustWhld4:1234, adjustWhld5:1234, adjustDed1:1234, adjustDed2:1234, adjustDed3:1234, adjustDed4:1234, adjustDed5:1234, adjustStoploss1:1234, adjustStoploss2:1234, adjustStoploss3:1234, adjustStoploss4:1234, adjustStoploss5:1234, adjustOther1:1234, adjustOther2:1234, adjustOther3:1234, adjustOther4:1234, adjustOther5:1234, accumAdjustPmpm1:1234, accumAdjustPmpm2:1234, accumAdjustPmpm3:1234, accumAdjustPmpm4:1234, accumAdjustPmpm5:1234, accumAdjustFfsWhld1:1234, accumAdjustFfsWhld2:1234, accumAdjustFfsWhld3:1234, accumAdjustFfsWhld4:1234, accumAdjustFfsWhld5:1234, accumAdjustWhld1:1234, accumAdjustWhld2:1234, accumAdjustWhld3:1234, accumAdjustWhld4:1234, accumAdjustWhld5:1234, accumAdjustDed1:1234, accumAdjustDed2:1234, accumAdjustDed3:1234, accumAdjustDed4:1234, accumAdjustDed5:1234, accumAdjustStoploss1:1234, accumAdjustStoploss2:1234, accumAdjustStoploss3:1234, accumAdjustStoploss4:1234, accumAdjustStoploss5:1234, accumAdjustOther1:1234, accumAdjustOther2:1234, accumAdjustOther3:1234, accumAdjustOther4:1234, accumAdjustOther5:1234},
       {seqCapFubalRptWrk:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', poolId1:'sample data', capFundBudgetAmt1:1234, encoutersClaimsAmt1:1234, ibnrEstAmt1:1234, stoplossReimburseAmt1:1234, capWithholdAmt1:1234, ffsWithholdAmt1:1234, accumCapFundBdgtAmt1:1234, accumCapEncClaimsAmt1:1234, accumCapIbnrEstAmt1:1234, accumCapStplssReimbAmt1:1234, accumCapWithholdAmt1:1234, accumCapFfsWithholdAmt1:1234, poolId2:'sample data', capFundBudgetAmt2:1234, encoutersClaimsAmt2:1234, ibnrEstAmt2:1234, stoplossReimburseAmt2:1234, capWithholdAmt2:1234, ffsWithholdAmt2:1234, accumCapFundBdgtAmt2:1234, accumCapEncClaimsAmt2:1234, accumCapIbnrEstAmt2:1234, accumCapStplssReimbAmt2:1234, accumCapCapWithholdAmt2:1234, accumCapFfsWithholdAmt2:1234, poolId3:'sample data', capFundBudgetAmt3:1234, encoutersClaimsAmt3:1234, ibnrEstAmt3:1234, stoplossReimburseAmt3:1234, capWithholdAmt3:1234, ffsWithholdAmt3:1234, accumCapFundBdgtAmt3:1234, accumCapEncClaimsAmt3:1234, accumCapIbnrEstAmt3:1234, accumCapStplssReimbAmt3:1234, accumCapCapWithholdAmt3:1234, accumCapFfsWithholdAmt3:1234, poolId4:'sample data', capFundBudgetAmt4:1234, encoutersClaimsAmt4:1234, ibnrEstAmt4:1234, stoplossReimburseAmt4:1234, capWithholdAmt4:1234, ffsWithholdAmt4:1234, accumCapFundBdgtAmt4:1234, accumCapEncClaimsAmt4:1234, accumCapIbnrEstAmt4:1234, accumCapStplssReimbAmt4:1234, accumCapCapWithholdAmt4:1234, accumCapFfsWithholdAmt4:1234, poolId5:'sample data', capFundBudgetAmt5:1234, encoutersClaimsAmt5:1234, ibnrEstAmt5:1234, stoplossReimburseAmt5:1234, capWithholdAmt5:1234, ffsWithholdAmt5:1234, accumCapFundBdgtAmt5:1234, accumCapEncClaimsAmt5:1234, accumCapIbnrEstAmt5:1234, accumCapStplssReimbAmt5:1234, accumCapCapWithholdAmt5:1234, accumCapFfsWithholdAmt5:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', adjustPmpm1:1234, adjustPmpm2:1234, adjustPmpm3:1234, adjustPmpm4:1234, adjustPmpm5:1234, adjustFfsWhld1:1234, adjustFfsWhld2:1234, adjustFfsWhld3:1234, adjustFfsWhld4:1234, adjustFfsWhld5:1234, adjustWhld1:1234, adjustWhld2:1234, adjustWhld3:1234, adjustWhld4:1234, adjustWhld5:1234, adjustDed1:1234, adjustDed2:1234, adjustDed3:1234, adjustDed4:1234, adjustDed5:1234, adjustStoploss1:1234, adjustStoploss2:1234, adjustStoploss3:1234, adjustStoploss4:1234, adjustStoploss5:1234, adjustOther1:1234, adjustOther2:1234, adjustOther3:1234, adjustOther4:1234, adjustOther5:1234, accumAdjustPmpm1:1234, accumAdjustPmpm2:1234, accumAdjustPmpm3:1234, accumAdjustPmpm4:1234, accumAdjustPmpm5:1234, accumAdjustFfsWhld1:1234, accumAdjustFfsWhld2:1234, accumAdjustFfsWhld3:1234, accumAdjustFfsWhld4:1234, accumAdjustFfsWhld5:1234, accumAdjustWhld1:1234, accumAdjustWhld2:1234, accumAdjustWhld3:1234, accumAdjustWhld4:1234, accumAdjustWhld5:1234, accumAdjustDed1:1234, accumAdjustDed2:1234, accumAdjustDed3:1234, accumAdjustDed4:1234, accumAdjustDed5:1234, accumAdjustStoploss1:1234, accumAdjustStoploss2:1234, accumAdjustStoploss3:1234, accumAdjustStoploss4:1234, accumAdjustStoploss5:1234, accumAdjustOther1:1234, accumAdjustOther2:1234, accumAdjustOther3:1234, accumAdjustOther4:1234, accumAdjustOther5:1234}

      ];
      service.getCapFubalRptWrks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capfubalrptwrks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capFubalRptWrk);
    });
  });


  describe('#createCapFubalRptWrk', () => {
    var id = 1;
    it('should return an Promise<CapFubalRptWrk>', () => {
      const capFubalRptWrk: CapFubalRptWrk = {seqCapFubalRptWrk:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', poolId1:'sample data', capFundBudgetAmt1:1234, encoutersClaimsAmt1:1234, ibnrEstAmt1:1234, stoplossReimburseAmt1:1234, capWithholdAmt1:1234, ffsWithholdAmt1:1234, accumCapFundBdgtAmt1:1234, accumCapEncClaimsAmt1:1234, accumCapIbnrEstAmt1:1234, accumCapStplssReimbAmt1:1234, accumCapWithholdAmt1:1234, accumCapFfsWithholdAmt1:1234, poolId2:'sample data', capFundBudgetAmt2:1234, encoutersClaimsAmt2:1234, ibnrEstAmt2:1234, stoplossReimburseAmt2:1234, capWithholdAmt2:1234, ffsWithholdAmt2:1234, accumCapFundBdgtAmt2:1234, accumCapEncClaimsAmt2:1234, accumCapIbnrEstAmt2:1234, accumCapStplssReimbAmt2:1234, accumCapCapWithholdAmt2:1234, accumCapFfsWithholdAmt2:1234, poolId3:'sample data', capFundBudgetAmt3:1234, encoutersClaimsAmt3:1234, ibnrEstAmt3:1234, stoplossReimburseAmt3:1234, capWithholdAmt3:1234, ffsWithholdAmt3:1234, accumCapFundBdgtAmt3:1234, accumCapEncClaimsAmt3:1234, accumCapIbnrEstAmt3:1234, accumCapStplssReimbAmt3:1234, accumCapCapWithholdAmt3:1234, accumCapFfsWithholdAmt3:1234, poolId4:'sample data', capFundBudgetAmt4:1234, encoutersClaimsAmt4:1234, ibnrEstAmt4:1234, stoplossReimburseAmt4:1234, capWithholdAmt4:1234, ffsWithholdAmt4:1234, accumCapFundBdgtAmt4:1234, accumCapEncClaimsAmt4:1234, accumCapIbnrEstAmt4:1234, accumCapStplssReimbAmt4:1234, accumCapCapWithholdAmt4:1234, accumCapFfsWithholdAmt4:1234, poolId5:'sample data', capFundBudgetAmt5:1234, encoutersClaimsAmt5:1234, ibnrEstAmt5:1234, stoplossReimburseAmt5:1234, capWithholdAmt5:1234, ffsWithholdAmt5:1234, accumCapFundBdgtAmt5:1234, accumCapEncClaimsAmt5:1234, accumCapIbnrEstAmt5:1234, accumCapStplssReimbAmt5:1234, accumCapCapWithholdAmt5:1234, accumCapFfsWithholdAmt5:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', adjustPmpm1:1234, adjustPmpm2:1234, adjustPmpm3:1234, adjustPmpm4:1234, adjustPmpm5:1234, adjustFfsWhld1:1234, adjustFfsWhld2:1234, adjustFfsWhld3:1234, adjustFfsWhld4:1234, adjustFfsWhld5:1234, adjustWhld1:1234, adjustWhld2:1234, adjustWhld3:1234, adjustWhld4:1234, adjustWhld5:1234, adjustDed1:1234, adjustDed2:1234, adjustDed3:1234, adjustDed4:1234, adjustDed5:1234, adjustStoploss1:1234, adjustStoploss2:1234, adjustStoploss3:1234, adjustStoploss4:1234, adjustStoploss5:1234, adjustOther1:1234, adjustOther2:1234, adjustOther3:1234, adjustOther4:1234, adjustOther5:1234, accumAdjustPmpm1:1234, accumAdjustPmpm2:1234, accumAdjustPmpm3:1234, accumAdjustPmpm4:1234, accumAdjustPmpm5:1234, accumAdjustFfsWhld1:1234, accumAdjustFfsWhld2:1234, accumAdjustFfsWhld3:1234, accumAdjustFfsWhld4:1234, accumAdjustFfsWhld5:1234, accumAdjustWhld1:1234, accumAdjustWhld2:1234, accumAdjustWhld3:1234, accumAdjustWhld4:1234, accumAdjustWhld5:1234, accumAdjustDed1:1234, accumAdjustDed2:1234, accumAdjustDed3:1234, accumAdjustDed4:1234, accumAdjustDed5:1234, accumAdjustStoploss1:1234, accumAdjustStoploss2:1234, accumAdjustStoploss3:1234, accumAdjustStoploss4:1234, accumAdjustStoploss5:1234, accumAdjustOther1:1234, accumAdjustOther2:1234, accumAdjustOther3:1234, accumAdjustOther4:1234, accumAdjustOther5:1234};
      service.createCapFubalRptWrk(capFubalRptWrk).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfubalrptwrks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapFubalRptWrk', () => {
    var id = 1;
    it('should return an Promise<CapFubalRptWrk>', () => {
      const capFubalRptWrk: CapFubalRptWrk = {seqCapFubalRptWrk:1234, seqJobId:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', seqCapPoolId:1234, capMonthRun:'2018-01-01', capMonth:'2018-01-01', provId:'sample data', provLastName:'sample data', provFirstName:'sample data', provMiddleInitial:'sample data', provProviderType:'sample data', provPrimarySpecialtyType:'sample data', vendId:'sample data', vendFullName:'sample data', groupId:'sample data', groupName:'sample data', poolId1:'sample data', capFundBudgetAmt1:1234, encoutersClaimsAmt1:1234, ibnrEstAmt1:1234, stoplossReimburseAmt1:1234, capWithholdAmt1:1234, ffsWithholdAmt1:1234, accumCapFundBdgtAmt1:1234, accumCapEncClaimsAmt1:1234, accumCapIbnrEstAmt1:1234, accumCapStplssReimbAmt1:1234, accumCapWithholdAmt1:1234, accumCapFfsWithholdAmt1:1234, poolId2:'sample data', capFundBudgetAmt2:1234, encoutersClaimsAmt2:1234, ibnrEstAmt2:1234, stoplossReimburseAmt2:1234, capWithholdAmt2:1234, ffsWithholdAmt2:1234, accumCapFundBdgtAmt2:1234, accumCapEncClaimsAmt2:1234, accumCapIbnrEstAmt2:1234, accumCapStplssReimbAmt2:1234, accumCapCapWithholdAmt2:1234, accumCapFfsWithholdAmt2:1234, poolId3:'sample data', capFundBudgetAmt3:1234, encoutersClaimsAmt3:1234, ibnrEstAmt3:1234, stoplossReimburseAmt3:1234, capWithholdAmt3:1234, ffsWithholdAmt3:1234, accumCapFundBdgtAmt3:1234, accumCapEncClaimsAmt3:1234, accumCapIbnrEstAmt3:1234, accumCapStplssReimbAmt3:1234, accumCapCapWithholdAmt3:1234, accumCapFfsWithholdAmt3:1234, poolId4:'sample data', capFundBudgetAmt4:1234, encoutersClaimsAmt4:1234, ibnrEstAmt4:1234, stoplossReimburseAmt4:1234, capWithholdAmt4:1234, ffsWithholdAmt4:1234, accumCapFundBdgtAmt4:1234, accumCapEncClaimsAmt4:1234, accumCapIbnrEstAmt4:1234, accumCapStplssReimbAmt4:1234, accumCapCapWithholdAmt4:1234, accumCapFfsWithholdAmt4:1234, poolId5:'sample data', capFundBudgetAmt5:1234, encoutersClaimsAmt5:1234, ibnrEstAmt5:1234, stoplossReimburseAmt5:1234, capWithholdAmt5:1234, ffsWithholdAmt5:1234, accumCapFundBdgtAmt5:1234, accumCapEncClaimsAmt5:1234, accumCapIbnrEstAmt5:1234, accumCapStplssReimbAmt5:1234, accumCapCapWithholdAmt5:1234, accumCapFfsWithholdAmt5:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', adjustmentFlag:'sample data', adjustPmpm1:1234, adjustPmpm2:1234, adjustPmpm3:1234, adjustPmpm4:1234, adjustPmpm5:1234, adjustFfsWhld1:1234, adjustFfsWhld2:1234, adjustFfsWhld3:1234, adjustFfsWhld4:1234, adjustFfsWhld5:1234, adjustWhld1:1234, adjustWhld2:1234, adjustWhld3:1234, adjustWhld4:1234, adjustWhld5:1234, adjustDed1:1234, adjustDed2:1234, adjustDed3:1234, adjustDed4:1234, adjustDed5:1234, adjustStoploss1:1234, adjustStoploss2:1234, adjustStoploss3:1234, adjustStoploss4:1234, adjustStoploss5:1234, adjustOther1:1234, adjustOther2:1234, adjustOther3:1234, adjustOther4:1234, adjustOther5:1234, accumAdjustPmpm1:1234, accumAdjustPmpm2:1234, accumAdjustPmpm3:1234, accumAdjustPmpm4:1234, accumAdjustPmpm5:1234, accumAdjustFfsWhld1:1234, accumAdjustFfsWhld2:1234, accumAdjustFfsWhld3:1234, accumAdjustFfsWhld4:1234, accumAdjustFfsWhld5:1234, accumAdjustWhld1:1234, accumAdjustWhld2:1234, accumAdjustWhld3:1234, accumAdjustWhld4:1234, accumAdjustWhld5:1234, accumAdjustDed1:1234, accumAdjustDed2:1234, accumAdjustDed3:1234, accumAdjustDed4:1234, accumAdjustDed5:1234, accumAdjustStoploss1:1234, accumAdjustStoploss2:1234, accumAdjustStoploss3:1234, accumAdjustStoploss4:1234, accumAdjustStoploss5:1234, accumAdjustOther1:1234, accumAdjustOther2:1234, accumAdjustOther3:1234, accumAdjustOther4:1234, accumAdjustOther5:1234};
      service.updateCapFubalRptWrk(capFubalRptWrk, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfubalrptwrks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapFubalRptWrk', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapFubalRptWrk(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capfubalrptwrks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});