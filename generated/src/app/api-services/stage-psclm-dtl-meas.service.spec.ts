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

import { StagePsclmDtlMeasService } from './stage-psclm-dtl-meas.service';
import { StagePsclmDtlMeas } from '../api-models/stage-psclm-dtl-meas.model'
import { StagePsclmDtlMeass } from "../api-models/testing/fake-stage-psclm-dtl-meas.model"

describe('StagePsclmDtlMeasService', () => {
  let injector: TestBed;
  let service: StagePsclmDtlMeasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePsclmDtlMeasService]
    });
    injector = getTestBed();
    service = injector.get(StagePsclmDtlMeasService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePsclmDtlMeass', () => {
    it('should return an Promise<StagePsclmDtlMeas[]>', () => {
      const stagePsclmDtlMeas = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, measIdentifier:'sample data', measType:'sample data', measValue:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, measIdentifier:'sample data', measType:'sample data', measValue:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, measIdentifier:'sample data', measType:'sample data', measValue:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStagePsclmDtlMeass().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlmeass/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePsclmDtlMeas);
    });
  });


  describe('#createStagePsclmDtlMeas', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtlMeas>', () => {
      const stagePsclmDtlMeas: StagePsclmDtlMeas = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, measIdentifier:'sample data', measType:'sample data', measValue:'sample data', insertDatetime:'2018-01-01'};
      service.createStagePsclmDtlMeas(stagePsclmDtlMeas).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlmeass`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePsclmDtlMeas', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtlMeas>', () => {
      const stagePsclmDtlMeas: StagePsclmDtlMeas = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, measIdentifier:'sample data', measType:'sample data', measValue:'sample data', insertDatetime:'2018-01-01'};
      service.updateStagePsclmDtlMeas(stagePsclmDtlMeas, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlmeass/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePsclmDtlMeas', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePsclmDtlMeas(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlmeass/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});