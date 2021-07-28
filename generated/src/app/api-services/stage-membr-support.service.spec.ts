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

import { StageMembrSupportService } from './stage-membr-support.service';
import { StageMembrSupport } from '../api-models/stage-membr-support.model'
import { StageMembrSupports } from "../api-models/testing/fake-stage-membr-support.model"

describe('StageMembrSupportService', () => {
  let injector: TestBed;
  let service: StageMembrSupportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageMembrSupportService]
    });
    injector = getTestBed();
    service = injector.get(StageMembrSupportService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageMembrSupports', () => {
    it('should return an Promise<StageMembrSupport[]>', () => {
      const stageMembrSupport = [
       {batchId:'sample data', transactionId:1234, seqGroupId:1234, seqProvId:1234, providerId:'sample data', provider2Id:'sample data', seqMembId:1234, seqSubsId:1234, seqEligHist:1234, seqEnrollmentRule:1234, facProvId:'sample data', facSeqProvId:1234},
       {batchId:'sample data', transactionId:1234, seqGroupId:1234, seqProvId:1234, providerId:'sample data', provider2Id:'sample data', seqMembId:1234, seqSubsId:1234, seqEligHist:1234, seqEnrollmentRule:1234, facProvId:'sample data', facSeqProvId:1234},
       {batchId:'sample data', transactionId:1234, seqGroupId:1234, seqProvId:1234, providerId:'sample data', provider2Id:'sample data', seqMembId:1234, seqSubsId:1234, seqEligHist:1234, seqEnrollmentRule:1234, facProvId:'sample data', facSeqProvId:1234}

      ];
      service.getStageMembrSupports().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagemembrsupports/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageMembrSupport);
    });
  });


  describe('#createStageMembrSupport', () => {
    var id = 1;
    it('should return an Promise<StageMembrSupport>', () => {
      const stageMembrSupport: StageMembrSupport = {batchId:'sample data', transactionId:1234, seqGroupId:1234, seqProvId:1234, providerId:'sample data', provider2Id:'sample data', seqMembId:1234, seqSubsId:1234, seqEligHist:1234, seqEnrollmentRule:1234, facProvId:'sample data', facSeqProvId:1234};
      service.createStageMembrSupport(stageMembrSupport).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagemembrsupports`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageMembrSupport', () => {
    var id = 1;
    it('should return an Promise<StageMembrSupport>', () => {
      const stageMembrSupport: StageMembrSupport = {batchId:'sample data', transactionId:1234, seqGroupId:1234, seqProvId:1234, providerId:'sample data', provider2Id:'sample data', seqMembId:1234, seqSubsId:1234, seqEligHist:1234, seqEnrollmentRule:1234, facProvId:'sample data', facSeqProvId:1234};
      service.updateStageMembrSupport(stageMembrSupport, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagemembrsupports/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageMembrSupport', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageMembrSupport(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagemembrsupports/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});