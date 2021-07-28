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

import { StageAuthAdvisorService } from './stage-auth-advisor.service';
import { StageAuthAdvisor } from '../api-models/stage-auth-advisor.model'
import { StageAuthAdvisors } from "../api-models/testing/fake-stage-auth-advisor.model"

describe('StageAuthAdvisorService', () => {
  let injector: TestBed;
  let service: StageAuthAdvisorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageAuthAdvisorService]
    });
    injector = getTestBed();
    service = injector.get(StageAuthAdvisorService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageAuthAdvisors', () => {
    it('should return an Promise<StageAuthAdvisor[]>', () => {
      const stageAuthAdvisor = [
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', contactDate:'2018-01-01', recommCode:'sample data', decisionDate:'2018-01-01', decision:'sample data', service:'sample data', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', contactDate:'2018-01-01', recommCode:'sample data', decisionDate:'2018-01-01', decision:'sample data', service:'sample data', comments:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', contactDate:'2018-01-01', recommCode:'sample data', decisionDate:'2018-01-01', decision:'sample data', service:'sample data', comments:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageAuthAdvisors().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthadvisors/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageAuthAdvisor);
    });
  });


  describe('#createStageAuthAdvisor', () => {
    var id = 1;
    it('should return an Promise<StageAuthAdvisor>', () => {
      const stageAuthAdvisor: StageAuthAdvisor = {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', contactDate:'2018-01-01', recommCode:'sample data', decisionDate:'2018-01-01', decision:'sample data', service:'sample data', comments:'sample data', insertDatetime:'2018-01-01'};
      service.createStageAuthAdvisor(stageAuthAdvisor).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthadvisors`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageAuthAdvisor', () => {
    var id = 1;
    it('should return an Promise<StageAuthAdvisor>', () => {
      const stageAuthAdvisor: StageAuthAdvisor = {batchId:'sample data', transactionId:1234, seqNo:1234, provId:'sample data', contactDate:'2018-01-01', recommCode:'sample data', decisionDate:'2018-01-01', decision:'sample data', service:'sample data', comments:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageAuthAdvisor(stageAuthAdvisor, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthadvisors/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageAuthAdvisor', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageAuthAdvisor(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stageauthadvisors/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});