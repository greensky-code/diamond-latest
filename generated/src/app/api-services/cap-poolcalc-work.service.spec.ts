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

import { CapPoolcalcWorkService } from './cap-poolcalc-work.service';
import { CapPoolcalcWork } from '../api-models/cap-poolcalc-work.model'
import { CapPoolcalcWorks } from "../api-models/testing/fake-cap-poolcalc-work.model"

describe('CapPoolcalcWorkService', () => {
  let injector: TestBed;
  let service: CapPoolcalcWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapPoolcalcWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapPoolcalcWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapPoolcalcWorks', () => {
    it('should return an Promise<CapPoolcalcWork[]>', () => {
      const capPoolcalcWork = [
       {seqCcalcId:1234, seqCapPoolcalcWork:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqCapPoolId:1234, capMonth:'2018-01-01', rateDet1:'sample data', rateDet2:'sample data', rateDet3:'sample data', pmpmAlloc:1234, pmpmWith:1234, seqAgeBandDtl:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', pmpmPostRule:'sample data', pmpmCoCode:'sample data', pmpmGlRef:'sample data', currentRetroFlag:'sample data', addChgTermFlag:'sample data', seqMembId:1234, seqGroupId:1234, planCode:'sample data', age:1234, gender:'sample data', rptMonthCap:'2018-01-01', seqCapRateHdr:1234, capRate:1234, positiveAmtFlag:'sample data', retroRateFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'},
       {seqCcalcId:1234, seqCapPoolcalcWork:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqCapPoolId:1234, capMonth:'2018-01-01', rateDet1:'sample data', rateDet2:'sample data', rateDet3:'sample data', pmpmAlloc:1234, pmpmWith:1234, seqAgeBandDtl:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', pmpmPostRule:'sample data', pmpmCoCode:'sample data', pmpmGlRef:'sample data', currentRetroFlag:'sample data', addChgTermFlag:'sample data', seqMembId:1234, seqGroupId:1234, planCode:'sample data', age:1234, gender:'sample data', rptMonthCap:'2018-01-01', seqCapRateHdr:1234, capRate:1234, positiveAmtFlag:'sample data', retroRateFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'},
       {seqCcalcId:1234, seqCapPoolcalcWork:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqCapPoolId:1234, capMonth:'2018-01-01', rateDet1:'sample data', rateDet2:'sample data', rateDet3:'sample data', pmpmAlloc:1234, pmpmWith:1234, seqAgeBandDtl:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', pmpmPostRule:'sample data', pmpmCoCode:'sample data', pmpmGlRef:'sample data', currentRetroFlag:'sample data', addChgTermFlag:'sample data', seqMembId:1234, seqGroupId:1234, planCode:'sample data', age:1234, gender:'sample data', rptMonthCap:'2018-01-01', seqCapRateHdr:1234, capRate:1234, positiveAmtFlag:'sample data', retroRateFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'}

      ];
      service.getCapPoolcalcWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolcalcworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capPoolcalcWork);
    });
  });


  describe('#createCapPoolcalcWork', () => {
    var id = 1;
    it('should return an Promise<CapPoolcalcWork>', () => {
      const capPoolcalcWork: CapPoolcalcWork = {seqCcalcId:1234, seqCapPoolcalcWork:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqCapPoolId:1234, capMonth:'2018-01-01', rateDet1:'sample data', rateDet2:'sample data', rateDet3:'sample data', pmpmAlloc:1234, pmpmWith:1234, seqAgeBandDtl:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', pmpmPostRule:'sample data', pmpmCoCode:'sample data', pmpmGlRef:'sample data', currentRetroFlag:'sample data', addChgTermFlag:'sample data', seqMembId:1234, seqGroupId:1234, planCode:'sample data', age:1234, gender:'sample data', rptMonthCap:'2018-01-01', seqCapRateHdr:1234, capRate:1234, positiveAmtFlag:'sample data', retroRateFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'};
      service.createCapPoolcalcWork(capPoolcalcWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolcalcworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapPoolcalcWork', () => {
    var id = 1;
    it('should return an Promise<CapPoolcalcWork>', () => {
      const capPoolcalcWork: CapPoolcalcWork = {seqCcalcId:1234, seqCapPoolcalcWork:1234, seqCapEntityWork:1234, seqCapEligWork:1234, seqCapPoolId:1234, capMonth:'2018-01-01', rateDet1:'sample data', rateDet2:'sample data', rateDet3:'sample data', pmpmAlloc:1234, pmpmWith:1234, seqAgeBandDtl:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', pmpmPostRule:'sample data', pmpmCoCode:'sample data', pmpmGlRef:'sample data', currentRetroFlag:'sample data', addChgTermFlag:'sample data', seqMembId:1234, seqGroupId:1234, planCode:'sample data', age:1234, gender:'sample data', rptMonthCap:'2018-01-01', seqCapRateHdr:1234, capRate:1234, positiveAmtFlag:'sample data', retroRateFlag:'sample data', seqIncentiveRule:1234, seqProvContract:1234, accessIncentiveAmount:1234, accessIncentivePercent:1234, accessCapApply:'sample data', incentiveRetro:'sample data'};
      service.updateCapPoolcalcWork(capPoolcalcWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolcalcworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapPoolcalcWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapPoolcalcWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cappoolcalcworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});