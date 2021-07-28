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

import { StageAuthMasterSupportService } from './stage-auth-master-support.service';
import { StageAuthMasterSupport } from '../api-models/stage-auth-master-support.model'
import { StageAuthMasterSupports } from "../api-models/testing/fake-stage-auth-master-support.model"

describe('StageAuthMasterSupportService', () => {
  let injector: TestBed;
  let service: StageAuthMasterSupportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthMasterSupportService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthMasterSupportService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthMasterSupports', () => {
    it('should return an Promise<StageAuthMasterSupport[]>', () => {
      const stageAuthMasterSupport = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, seqMembId:1234, seqGroupId:1234, dataGroups:'sample data', seqEligHist:1234, seqProvId:1234, authScreenMod:'sample data', diagnosis1Text:'sample data', diagnosis2Text:'sample data', diagnosis3Text:'sample data', diagnosis4Text:'sample data', diagnosis5Text:'sample data', diagnosis6Text:'sample data', diagnosis7Text:'sample data', diagnosis8Text:'sample data', diagnosis9Text:'sample data', activeDaysVisit:'sample data', activeProcedure:'sample data', activeAppeal:'sample data', activePhysicianAdvisor:'sample data', activeSecondOpinion:'sample data', urMessage:'sample data', privacyApplied:'sample data', authType:'sample data'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, seqMembId:1234, seqGroupId:1234, dataGroups:'sample data', seqEligHist:1234, seqProvId:1234, authScreenMod:'sample data', diagnosis1Text:'sample data', diagnosis2Text:'sample data', diagnosis3Text:'sample data', diagnosis4Text:'sample data', diagnosis5Text:'sample data', diagnosis6Text:'sample data', diagnosis7Text:'sample data', diagnosis8Text:'sample data', diagnosis9Text:'sample data', activeDaysVisit:'sample data', activeProcedure:'sample data', activeAppeal:'sample data', activePhysicianAdvisor:'sample data', activeSecondOpinion:'sample data', urMessage:'sample data', privacyApplied:'sample data', authType:'sample data'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, seqMembId:1234, seqGroupId:1234, dataGroups:'sample data', seqEligHist:1234, seqProvId:1234, authScreenMod:'sample data', diagnosis1Text:'sample data', diagnosis2Text:'sample data', diagnosis3Text:'sample data', diagnosis4Text:'sample data', diagnosis5Text:'sample data', diagnosis6Text:'sample data', diagnosis7Text:'sample data', diagnosis8Text:'sample data', diagnosis9Text:'sample data', activeDaysVisit:'sample data', activeProcedure:'sample data', activeAppeal:'sample data', activePhysicianAdvisor:'sample data', activeSecondOpinion:'sample data', urMessage:'sample data', privacyApplied:'sample data', authType:'sample data'}

      ];
      service.getStageAuthMasterSupports().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthmastersupports/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthMasterSupport);
    });
  });


  describe('#createStageAuthMasterSupport', () => {
    var id = 1;
    it('should return an Promise<StageAuthMasterSupport>', () => {
      const stageAuthMasterSupport: StageAuthMasterSupport = {batchId:'sample data', transactionId:1234, seqNo:1234, seqMembId:1234, seqGroupId:1234, dataGroups:'sample data', seqEligHist:1234, seqProvId:1234, authScreenMod:'sample data', diagnosis1Text:'sample data', diagnosis2Text:'sample data', diagnosis3Text:'sample data', diagnosis4Text:'sample data', diagnosis5Text:'sample data', diagnosis6Text:'sample data', diagnosis7Text:'sample data', diagnosis8Text:'sample data', diagnosis9Text:'sample data', activeDaysVisit:'sample data', activeProcedure:'sample data', activeAppeal:'sample data', activePhysicianAdvisor:'sample data', activeSecondOpinion:'sample data', urMessage:'sample data', privacyApplied:'sample data', authType:'sample data'};
      service.createStageAuthMasterSupport(stageAuthMasterSupport).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthmastersupports`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthMasterSupport', () => {
    var id = 1;
    it('should return an Promise<StageAuthMasterSupport>', () => {
      const stageAuthMasterSupport: StageAuthMasterSupport = {batchId:'sample data', transactionId:1234, seqNo:1234, seqMembId:1234, seqGroupId:1234, dataGroups:'sample data', seqEligHist:1234, seqProvId:1234, authScreenMod:'sample data', diagnosis1Text:'sample data', diagnosis2Text:'sample data', diagnosis3Text:'sample data', diagnosis4Text:'sample data', diagnosis5Text:'sample data', diagnosis6Text:'sample data', diagnosis7Text:'sample data', diagnosis8Text:'sample data', diagnosis9Text:'sample data', activeDaysVisit:'sample data', activeProcedure:'sample data', activeAppeal:'sample data', activePhysicianAdvisor:'sample data', activeSecondOpinion:'sample data', urMessage:'sample data', privacyApplied:'sample data', authType:'sample data'};
      service.updateStageAuthMasterSupport(stageAuthMasterSupport, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthmastersupports/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthMasterSupport', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthMasterSupport(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthmastersupports/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});