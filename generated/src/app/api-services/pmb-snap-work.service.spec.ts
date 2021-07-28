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

import { PmbSnapWorkService } from './pmb-snap-work.service';
import { PmbSnapWork } from '../api-models/pmb-snap-work.model'
import { PmbSnapWorks } from "../api-models/testing/fake-pmb-snap-work.model"

describe('PmbSnapWorkService', () => {
  let injector: TestBed;
  let service: PmbSnapWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSnapWorkService]
    });
    injector = getTestBed();
    service = injector.get(PmbSnapWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSnapWorks', () => {
    it('should return an Promise<PmbSnapWork[]>', () => {
      const pmbSnapWork = [
       {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', medicareStatus:'sample data', otherStatusFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', customerType:'sample data', customerId:'sample data', positivePremium:'sample data', prorationMethod:'sample data', billEffectiveFrom:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', seqParentId:1234, rateType:'sample data'},
       {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', medicareStatus:'sample data', otherStatusFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', customerType:'sample data', customerId:'sample data', positivePremium:'sample data', prorationMethod:'sample data', billEffectiveFrom:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', seqParentId:1234, rateType:'sample data'},
       {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', medicareStatus:'sample data', otherStatusFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', customerType:'sample data', customerId:'sample data', positivePremium:'sample data', prorationMethod:'sample data', billEffectiveFrom:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', seqParentId:1234, rateType:'sample data'}

      ];
      service.getPmbSnapWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSnapWork);
    });
  });


  describe('#createPmbSnapWork', () => {
    var id = 1;
    it('should return an Promise<PmbSnapWork>', () => {
      const pmbSnapWork: PmbSnapWork = {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', medicareStatus:'sample data', otherStatusFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', customerType:'sample data', customerId:'sample data', positivePremium:'sample data', prorationMethod:'sample data', billEffectiveFrom:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', seqParentId:1234, rateType:'sample data'};
      service.createPmbSnapWork(pmbSnapWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSnapWork', () => {
    var id = 1;
    it('should return an Promise<PmbSnapWork>', () => {
      const pmbSnapWork: PmbSnapWork = {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', medicareStatus:'sample data', otherStatusFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', customerType:'sample data', customerId:'sample data', positivePremium:'sample data', prorationMethod:'sample data', billEffectiveFrom:'2018-01-01', subscDept:'sample data', subscLocation:'sample data', seqParentId:1234, rateType:'sample data'};
      service.updatePmbSnapWork(pmbSnapWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSnapWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSnapWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});