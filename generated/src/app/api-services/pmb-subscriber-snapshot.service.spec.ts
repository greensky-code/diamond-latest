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

import { PmbSubscriberSnapshotService } from './pmb-subscriber-snapshot.service';
import { PmbSubscriberSnapshot } from '../api-models/pmb-subscriber-snapshot.model'
import { PmbSubscriberSnapshots } from "../api-models/testing/fake-pmb-subscriber-snapshot.model"

describe('PmbSubscriberSnapshotService', () => {
  let injector: TestBed;
  let service: PmbSubscriberSnapshotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubscriberSnapshotService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubscriberSnapshotService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubscriberSnapshots', () => {
    it('should return an Promise<PmbSubscriberSnapshot[]>', () => {
      const pmbSubscriberSnapshot = [
       {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', planCode:'sample data', familySize:1234, spouseFlag:'sample data', seqGroupId:1234, otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', planCode:'sample data', familySize:1234, spouseFlag:'sample data', seqGroupId:1234, otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', planCode:'sample data', familySize:1234, spouseFlag:'sample data', seqGroupId:1234, otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'}

      ];
      service.getPmbSubscriberSnapshots().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscribersnapshots/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubscriberSnapshot);
    });
  });


  describe('#createPmbSubscriberSnapshot', () => {
    var id = 1;
    it('should return an Promise<PmbSubscriberSnapshot>', () => {
      const pmbSubscriberSnapshot: PmbSubscriberSnapshot = {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', planCode:'sample data', familySize:1234, spouseFlag:'sample data', seqGroupId:1234, otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'};
      service.createPmbSubscriberSnapshot(pmbSubscriberSnapshot).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscribersnapshots`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubscriberSnapshot', () => {
    var id = 1;
    it('should return an Promise<PmbSubscriberSnapshot>', () => {
      const pmbSubscriberSnapshot: PmbSubscriberSnapshot = {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', planCode:'sample data', familySize:1234, spouseFlag:'sample data', seqGroupId:1234, otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'};
      service.updatePmbSubscriberSnapshot(pmbSubscriberSnapshot, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscribersnapshots/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubscriberSnapshot', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubscriberSnapshot(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscribersnapshots/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});