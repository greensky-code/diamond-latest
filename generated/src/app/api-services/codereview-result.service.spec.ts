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

import { CodereviewResultService } from './codereview-result.service';
import { CodereviewResult } from '../api-models/codereview-result.model'
import { CodereviewResults } from "../api-models/testing/fake-codereview-result.model"

describe('CodereviewResultService', () => {
  let injector: TestBed;
  let service: CodereviewResultService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CodereviewResultService]
    });
    injector = getTestBed();
    service = injector.get(CodereviewResultService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCodereviewResults', () => {
    it('should return an Promise<CodereviewResult[]>', () => {
      const codereviewResult = [
       {seqClaimResultCode:1234, claimResultCode:'sample data', moduleType:'sample data', crStatus:'sample data', recNum:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimResultCode:1234, claimResultCode:'sample data', moduleType:'sample data', crStatus:'sample data', recNum:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimResultCode:1234, claimResultCode:'sample data', moduleType:'sample data', crStatus:'sample data', recNum:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCodereviewResults().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewresults/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(codereviewResult);
    });
  });


  describe('#createCodereviewResult', () => {
    var id = 1;
    it('should return an Promise<CodereviewResult>', () => {
      const codereviewResult: CodereviewResult = {seqClaimResultCode:1234, claimResultCode:'sample data', moduleType:'sample data', crStatus:'sample data', recNum:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCodereviewResult(codereviewResult).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewresults`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCodereviewResult', () => {
    var id = 1;
    it('should return an Promise<CodereviewResult>', () => {
      const codereviewResult: CodereviewResult = {seqClaimResultCode:1234, claimResultCode:'sample data', moduleType:'sample data', crStatus:'sample data', recNum:1234, claimAction:'sample data', reasnCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCodereviewResult(codereviewResult, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewresults/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCodereviewResult', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCodereviewResult(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewresults/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});