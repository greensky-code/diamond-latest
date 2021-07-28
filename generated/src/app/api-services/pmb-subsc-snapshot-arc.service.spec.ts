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

import { PmbSubscSnapshotArcService } from './pmb-subsc-snapshot-arc.service';
import { PmbSubscSnapshotArc } from '../api-models/pmb-subsc-snapshot-arc.model'
import { PmbSubscSnapshotArcs } from "../api-models/testing/fake-pmb-subsc-snapshot-arc.model"

describe('PmbSubscSnapshotArcService', () => {
  let injector: TestBed;
  let service: PmbSubscSnapshotArcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubscSnapshotArcService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubscSnapshotArcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubscSnapshotArcs', () => {
    it('should return an Promise<PmbSubscSnapshotArc[]>', () => {
      const pmbSubscSnapshotArc = [
       {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'}

      ];
      service.getPmbSubscSnapshotArcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapshotarcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubscSnapshotArc);
    });
  });


  describe('#createPmbSubscSnapshotArc', () => {
    var id = 1;
    it('should return an Promise<PmbSubscSnapshotArc>', () => {
      const pmbSubscSnapshotArc: PmbSubscSnapshotArc = {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'};
      service.createPmbSubscSnapshotArc(pmbSubscSnapshotArc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapshotarcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubscSnapshotArc', () => {
    var id = 1;
    it('should return an Promise<PmbSubscSnapshotArc>', () => {
      const pmbSubscSnapshotArc: PmbSubscSnapshotArc = {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', effectiveDate:'2018-01-01', seqGroupId:1234, planCode:'sample data', familySize:1234, spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', termDate:'2018-01-01', subscriberDob:'2018-01-01', subscriberGender:'sample data', salary:1234, medicareStatus:'sample data', subscDept:'sample data', subscLocation:'sample data', billEffectiveFrom:'2018-01-01', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', rateType:'sample data'};
      service.updatePmbSubscSnapshotArc(pmbSubscSnapshotArc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapshotarcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubscSnapshotArc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubscSnapshotArc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapshotarcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});