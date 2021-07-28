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

import { SubscriberSnapshotService } from './subscriber-snapshot.service';
import { SubscriberSnapshot } from '../api-models/subscriber-snapshot.model'
import { SubscriberSnapshots } from "../api-models/testing/fake-subscriber-snapshot.model"

describe('SubscriberSnapshotService', () => {
  let injector: TestBed;
  let service: SubscriberSnapshotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriberSnapshotService]
    });
    injector = getTestBed();
    service = injector.get(SubscriberSnapshotService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSubscriberSnapshots', () => {
    it('should return an Promise<SubscriberSnapshot[]>', () => {
      const subscriberSnapshot = [
       {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', familySize:1234, spouseFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', riderCode1:'sample data', riderCode1NoMbrs:1234, riderCode2:'sample data', riderCode2NoMbrs:1234, riderCode3:'sample data', riderCode3NoMbrs:1234, riderCode4:'sample data', riderCode4NoMbrs:1234, riderCode5:'sample data', riderCode5NoMbrs:1234, riderCode6:'sample data', riderCode6NoMbrs:1234, riderCode7:'sample data', riderCode7NoMbrs:1234, riderCode8:'sample data', riderCode8NoMbrs:1234, riderCode9:'sample data', riderCode9NoMbrs:1234, riderCode10:'sample data', riderCode10NoMbrs:1234, riderCode11:'sample data', riderCode11NoMbrs:1234, riderCode12:'sample data', riderCode12NoMbrs:1234, riderCode13:'sample data', riderCode13NoMbrs:1234, riderCode14:'sample data', riderCode14NoMbrs:1234, riderCode15:'sample data', riderCode15NoMbrs:1234, riderCode16:'sample data', riderCode16NoMbrs:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', salary:1234, medicareStatus:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', familySize:1234, spouseFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', riderCode1:'sample data', riderCode1NoMbrs:1234, riderCode2:'sample data', riderCode2NoMbrs:1234, riderCode3:'sample data', riderCode3NoMbrs:1234, riderCode4:'sample data', riderCode4NoMbrs:1234, riderCode5:'sample data', riderCode5NoMbrs:1234, riderCode6:'sample data', riderCode6NoMbrs:1234, riderCode7:'sample data', riderCode7NoMbrs:1234, riderCode8:'sample data', riderCode8NoMbrs:1234, riderCode9:'sample data', riderCode9NoMbrs:1234, riderCode10:'sample data', riderCode10NoMbrs:1234, riderCode11:'sample data', riderCode11NoMbrs:1234, riderCode12:'sample data', riderCode12NoMbrs:1234, riderCode13:'sample data', riderCode13NoMbrs:1234, riderCode14:'sample data', riderCode14NoMbrs:1234, riderCode15:'sample data', riderCode15NoMbrs:1234, riderCode16:'sample data', riderCode16NoMbrs:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', salary:1234, medicareStatus:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', familySize:1234, spouseFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', riderCode1:'sample data', riderCode1NoMbrs:1234, riderCode2:'sample data', riderCode2NoMbrs:1234, riderCode3:'sample data', riderCode3NoMbrs:1234, riderCode4:'sample data', riderCode4NoMbrs:1234, riderCode5:'sample data', riderCode5NoMbrs:1234, riderCode6:'sample data', riderCode6NoMbrs:1234, riderCode7:'sample data', riderCode7NoMbrs:1234, riderCode8:'sample data', riderCode8NoMbrs:1234, riderCode9:'sample data', riderCode9NoMbrs:1234, riderCode10:'sample data', riderCode10NoMbrs:1234, riderCode11:'sample data', riderCode11NoMbrs:1234, riderCode12:'sample data', riderCode12NoMbrs:1234, riderCode13:'sample data', riderCode13NoMbrs:1234, riderCode14:'sample data', riderCode14NoMbrs:1234, riderCode15:'sample data', riderCode15NoMbrs:1234, riderCode16:'sample data', riderCode16NoMbrs:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', salary:1234, medicareStatus:'sample data'}

      ];
      service.getSubscriberSnapshots().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/subscribersnapshots/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(subscriberSnapshot);
    });
  });


  describe('#createSubscriberSnapshot', () => {
    var id = 1;
    it('should return an Promise<SubscriberSnapshot>', () => {
      const subscriberSnapshot: SubscriberSnapshot = {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', familySize:1234, spouseFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', riderCode1:'sample data', riderCode1NoMbrs:1234, riderCode2:'sample data', riderCode2NoMbrs:1234, riderCode3:'sample data', riderCode3NoMbrs:1234, riderCode4:'sample data', riderCode4NoMbrs:1234, riderCode5:'sample data', riderCode5NoMbrs:1234, riderCode6:'sample data', riderCode6NoMbrs:1234, riderCode7:'sample data', riderCode7NoMbrs:1234, riderCode8:'sample data', riderCode8NoMbrs:1234, riderCode9:'sample data', riderCode9NoMbrs:1234, riderCode10:'sample data', riderCode10NoMbrs:1234, riderCode11:'sample data', riderCode11NoMbrs:1234, riderCode12:'sample data', riderCode12NoMbrs:1234, riderCode13:'sample data', riderCode13NoMbrs:1234, riderCode14:'sample data', riderCode14NoMbrs:1234, riderCode15:'sample data', riderCode15NoMbrs:1234, riderCode16:'sample data', riderCode16NoMbrs:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', salary:1234, medicareStatus:'sample data'};
      service.createSubscriberSnapshot(subscriberSnapshot).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscribersnapshots`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSubscriberSnapshot', () => {
    var id = 1;
    it('should return an Promise<SubscriberSnapshot>', () => {
      const subscriberSnapshot: SubscriberSnapshot = {seqSubsId:1234, seqSubsUpdate:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', familySize:1234, spouseFlag:'sample data', subscriberDob:'2018-01-01', subscriberGender:'sample data', riderCode1:'sample data', riderCode1NoMbrs:1234, riderCode2:'sample data', riderCode2NoMbrs:1234, riderCode3:'sample data', riderCode3NoMbrs:1234, riderCode4:'sample data', riderCode4NoMbrs:1234, riderCode5:'sample data', riderCode5NoMbrs:1234, riderCode6:'sample data', riderCode6NoMbrs:1234, riderCode7:'sample data', riderCode7NoMbrs:1234, riderCode8:'sample data', riderCode8NoMbrs:1234, riderCode9:'sample data', riderCode9NoMbrs:1234, riderCode10:'sample data', riderCode10NoMbrs:1234, riderCode11:'sample data', riderCode11NoMbrs:1234, riderCode12:'sample data', riderCode12NoMbrs:1234, riderCode13:'sample data', riderCode13NoMbrs:1234, riderCode14:'sample data', riderCode14NoMbrs:1234, riderCode15:'sample data', riderCode15NoMbrs:1234, riderCode16:'sample data', riderCode16NoMbrs:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', salary:1234, medicareStatus:'sample data'};
      service.updateSubscriberSnapshot(subscriberSnapshot, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscribersnapshots/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSubscriberSnapshot', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSubscriberSnapshot(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/subscribersnapshots/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});