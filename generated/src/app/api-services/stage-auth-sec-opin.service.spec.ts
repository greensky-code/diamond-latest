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

import { StageAuthSecOpinService } from './stage-auth-sec-opin.service';
import { StageAuthSecOpin } from '../api-models/stage-auth-sec-opin.model'
import { StageAuthSecOpins } from "../api-models/testing/fake-stage-auth-sec-opin.model"

describe('StageAuthSecOpinService', () => {
  let injector: TestBed;
  let service: StageAuthSecOpinService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthSecOpinService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthSecOpinService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthSecOpins', () => {
    it('should return an Promise<StageAuthSecOpin[]>', () => {
      const stageAuthSecOpin = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', secondOpinion:'sample data', secOpnDate:'2018-01-01', decision:'sample data', status:'sample data', statusReason:'sample data', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', secondOpinion:'sample data', secOpnDate:'2018-01-01', decision:'sample data', status:'sample data', statusReason:'sample data', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', secondOpinion:'sample data', secOpnDate:'2018-01-01', decision:'sample data', status:'sample data', statusReason:'sample data', comments:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageAuthSecOpins().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthsecopins/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthSecOpin);
    });
  });


  describe('#createStageAuthSecOpin', () => {
    var id = 1;
    it('should return an Promise<StageAuthSecOpin>', () => {
      const stageAuthSecOpin: StageAuthSecOpin = {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', secondOpinion:'sample data', secOpnDate:'2018-01-01', decision:'sample data', status:'sample data', statusReason:'sample data', comments:'sample data', insertDatetime:'2018-01-01'};
      service.createStageAuthSecOpin(stageAuthSecOpin).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthsecopins`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthSecOpin', () => {
    var id = 1;
    it('should return an Promise<StageAuthSecOpin>', () => {
      const stageAuthSecOpin: StageAuthSecOpin = {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', secondOpinion:'sample data', secOpnDate:'2018-01-01', decision:'sample data', status:'sample data', statusReason:'sample data', comments:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageAuthSecOpin(stageAuthSecOpin, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthsecopins/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthSecOpin', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthSecOpin(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthsecopins/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});