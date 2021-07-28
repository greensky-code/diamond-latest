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

import { StagePsclmDtlSpinalService } from './stage-psclm-dtl-spinal.service';
import { StagePsclmDtlSpinal } from '../api-models/stage-psclm-dtl-spinal.model'
import { StagePsclmDtlSpinals } from "../api-models/testing/fake-stage-psclm-dtl-spinal.model"

describe('StagePsclmDtlSpinalService', () => {
  let injector: TestBed;
  let service: StagePsclmDtlSpinalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePsclmDtlSpinalService]
    });
    injector = getTestBed();
    service = injector.get(StagePsclmDtlSpinalService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePsclmDtlSpinals', () => {
    it('should return an Promise<StagePsclmDtlSpinal[]>', () => {
      const stagePsclmDtlSpinal = [
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStagePsclmDtlSpinals().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlspinals/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePsclmDtlSpinal);
    });
  });


  describe('#createStagePsclmDtlSpinal', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtlSpinal>', () => {
      const stagePsclmDtlSpinal: StagePsclmDtlSpinal = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', insertDatetime:'2018-01-01'};
      service.createStagePsclmDtlSpinal(stagePsclmDtlSpinal).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlspinals`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePsclmDtlSpinal', () => {
    var id = 1;
    it('should return an Promise<StagePsclmDtlSpinal>', () => {
      const stagePsclmDtlSpinal: StagePsclmDtlSpinal = {batchId:'sample data', transactionId:1234, lineNo:1234, subLineCode:'sample data', sequenceNo:1234, spinalManipConditionCode:'sample data', spinalManipConditionDesc1:'sample data', spinalManipConditionDesc2:'sample data', spinalManipConditionXrayAv:'sample data', insertDatetime:'2018-01-01'};
      service.updateStagePsclmDtlSpinal(stagePsclmDtlSpinal, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlspinals/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePsclmDtlSpinal', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePsclmDtlSpinal(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmdtlspinals/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});