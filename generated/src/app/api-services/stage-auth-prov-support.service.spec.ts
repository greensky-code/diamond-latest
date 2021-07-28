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

import { StageAuthProvSupportService } from './stage-auth-prov-support.service';
import { StageAuthProvSupport } from '../api-models/stage-auth-prov-support.model'
import { StageAuthProvSupports } from "../api-models/testing/fake-stage-auth-prov-support.model"

describe('StageAuthProvSupportService', () => {
  let injector: TestBed;
  let service: StageAuthProvSupportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthProvSupportService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthProvSupportService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthProvSupports', () => {
    it('should return an Promise<StageAuthProvSupport[]>', () => {
      const stageAuthProvSupport = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, lastName:'sample data', firstName:'sample data', seqProvId:1234, seqProvContract:1234, prevSeqProvId:1234, seqProvxId:1234, seqCovProvGrp:1234, inAreaServiceStatus:'sample data'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, lastName:'sample data', firstName:'sample data', seqProvId:1234, seqProvContract:1234, prevSeqProvId:1234, seqProvxId:1234, seqCovProvGrp:1234, inAreaServiceStatus:'sample data'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, lastName:'sample data', firstName:'sample data', seqProvId:1234, seqProvContract:1234, prevSeqProvId:1234, seqProvxId:1234, seqCovProvGrp:1234, inAreaServiceStatus:'sample data'}

      ];
      service.getStageAuthProvSupports().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovsupports/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthProvSupport);
    });
  });


  describe('#createStageAuthProvSupport', () => {
    var id = 1;
    it('should return an Promise<StageAuthProvSupport>', () => {
      const stageAuthProvSupport: StageAuthProvSupport = {batchId:'sample data', transactionId:1234, seqNo:1234, lastName:'sample data', firstName:'sample data', seqProvId:1234, seqProvContract:1234, prevSeqProvId:1234, seqProvxId:1234, seqCovProvGrp:1234, inAreaServiceStatus:'sample data'};
      service.createStageAuthProvSupport(stageAuthProvSupport).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovsupports`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthProvSupport', () => {
    var id = 1;
    it('should return an Promise<StageAuthProvSupport>', () => {
      const stageAuthProvSupport: StageAuthProvSupport = {batchId:'sample data', transactionId:1234, seqNo:1234, lastName:'sample data', firstName:'sample data', seqProvId:1234, seqProvContract:1234, prevSeqProvId:1234, seqProvxId:1234, seqCovProvGrp:1234, inAreaServiceStatus:'sample data'};
      service.updateStageAuthProvSupport(stageAuthProvSupport, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovsupports/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthProvSupport', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthProvSupport(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthprovsupports/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});