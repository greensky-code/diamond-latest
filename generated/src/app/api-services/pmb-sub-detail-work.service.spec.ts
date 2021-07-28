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

import { PmbSubDetailWorkService } from './pmb-sub-detail-work.service';
import { PmbSubDetailWork } from '../api-models/pmb-sub-detail-work.model'
import { PmbSubDetailWorks } from "../api-models/testing/fake-pmb-sub-detail-work.model"

describe('PmbSubDetailWorkService', () => {
  let injector: TestBed;
  let service: PmbSubDetailWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubDetailWorkService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubDetailWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubDetailWorks', () => {
    it('should return an Promise<PmbSubDetailWork[]>', () => {
      const pmbSubDetailWork = [
       {seqGpbilId:1234, seqSubDtlId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, seqSubsId:1234, seqMembId:1234, subscriberId:'sample data', personNumber:'sample data', employeeNumber:'sample data', subscDept:'sample data', subscLocation:'sample data', billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', recordType:'sample data', planRiderCode:'sample data', cobraFlag:'sample data', billedEntityName:'sample data', billedEntityRelationCode:'sample data', billedEntityDateOfBirth:'2018-01-01', billedEntityAge:1234, billedEntityGender:'sample data', familySize:1234, premiumStep:'sample data', monthlyRate:1234, premiumAmt:1234, salary:1234, medicareStatus:'sample data', seqParentId:1234, rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data'},
       {seqGpbilId:1234, seqSubDtlId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, seqSubsId:1234, seqMembId:1234, subscriberId:'sample data', personNumber:'sample data', employeeNumber:'sample data', subscDept:'sample data', subscLocation:'sample data', billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', recordType:'sample data', planRiderCode:'sample data', cobraFlag:'sample data', billedEntityName:'sample data', billedEntityRelationCode:'sample data', billedEntityDateOfBirth:'2018-01-01', billedEntityAge:1234, billedEntityGender:'sample data', familySize:1234, premiumStep:'sample data', monthlyRate:1234, premiumAmt:1234, salary:1234, medicareStatus:'sample data', seqParentId:1234, rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data'},
       {seqGpbilId:1234, seqSubDtlId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, seqSubsId:1234, seqMembId:1234, subscriberId:'sample data', personNumber:'sample data', employeeNumber:'sample data', subscDept:'sample data', subscLocation:'sample data', billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', recordType:'sample data', planRiderCode:'sample data', cobraFlag:'sample data', billedEntityName:'sample data', billedEntityRelationCode:'sample data', billedEntityDateOfBirth:'2018-01-01', billedEntityAge:1234, billedEntityGender:'sample data', familySize:1234, premiumStep:'sample data', monthlyRate:1234, premiumAmt:1234, salary:1234, medicareStatus:'sample data', seqParentId:1234, rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data'}

      ];
      service.getPmbSubDetailWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetailworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubDetailWork);
    });
  });


  describe('#createPmbSubDetailWork', () => {
    var id = 1;
    it('should return an Promise<PmbSubDetailWork>', () => {
      const pmbSubDetailWork: PmbSubDetailWork = {seqGpbilId:1234, seqSubDtlId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, seqSubsId:1234, seqMembId:1234, subscriberId:'sample data', personNumber:'sample data', employeeNumber:'sample data', subscDept:'sample data', subscLocation:'sample data', billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', recordType:'sample data', planRiderCode:'sample data', cobraFlag:'sample data', billedEntityName:'sample data', billedEntityRelationCode:'sample data', billedEntityDateOfBirth:'2018-01-01', billedEntityAge:1234, billedEntityGender:'sample data', familySize:1234, premiumStep:'sample data', monthlyRate:1234, premiumAmt:1234, salary:1234, medicareStatus:'sample data', seqParentId:1234, rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data'};
      service.createPmbSubDetailWork(pmbSubDetailWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetailworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubDetailWork', () => {
    var id = 1;
    it('should return an Promise<PmbSubDetailWork>', () => {
      const pmbSubDetailWork: PmbSubDetailWork = {seqGpbilId:1234, seqSubDtlId:1234, customerType:'sample data', customerId:'sample data', groupId:'sample data', invoiceNo:1234, seqSubsId:1234, seqMembId:1234, subscriberId:'sample data', personNumber:'sample data', employeeNumber:'sample data', subscDept:'sample data', subscLocation:'sample data', billDetailFromDate:'2018-01-01', billDetailThruDate:'2018-01-01', recordType:'sample data', planRiderCode:'sample data', cobraFlag:'sample data', billedEntityName:'sample data', billedEntityRelationCode:'sample data', billedEntityDateOfBirth:'2018-01-01', billedEntityAge:1234, billedEntityGender:'sample data', familySize:1234, premiumStep:'sample data', monthlyRate:1234, premiumAmt:1234, salary:1234, medicareStatus:'sample data', seqParentId:1234, rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data'};
      service.updatePmbSubDetailWork(pmbSubDetailWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetailworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubDetailWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubDetailWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetailworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});