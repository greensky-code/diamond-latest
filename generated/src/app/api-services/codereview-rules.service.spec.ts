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

import { CodereviewRulesService } from './codereview-rules.service';
import { CodereviewRules } from '../api-models/codereview-rules.model'
import { CodereviewRuleses } from "../api-models/testing/fake-codereview-rules.model"

describe('CodereviewRulesService', () => {
  let injector: TestBed;
  let service: CodereviewRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CodereviewRulesService]
    });
    injector = getTestBed();
    service = injector.get(CodereviewRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCodereviewRuleses', () => {
    it('should return an Promise<CodereviewRules[]>', () => {
      const codereviewRules = [
       {claimResultCode:'sample data', processMethod:'sample data', usePromatch:'sample data', pmatchKbId:1234, histChangeHoldReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origLineDenyReasn:'sample data'},
       {claimResultCode:'sample data', processMethod:'sample data', usePromatch:'sample data', pmatchKbId:1234, histChangeHoldReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origLineDenyReasn:'sample data'},
       {claimResultCode:'sample data', processMethod:'sample data', usePromatch:'sample data', pmatchKbId:1234, histChangeHoldReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origLineDenyReasn:'sample data'}

      ];
      service.getCodereviewRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(codereviewRules);
    });
  });


  describe('#createCodereviewRules', () => {
    var id = 1;
    it('should return an Promise<CodereviewRules>', () => {
      const codereviewRules: CodereviewRules = {claimResultCode:'sample data', processMethod:'sample data', usePromatch:'sample data', pmatchKbId:1234, histChangeHoldReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origLineDenyReasn:'sample data'};
      service.createCodereviewRules(codereviewRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCodereviewRules', () => {
    var id = 1;
    it('should return an Promise<CodereviewRules>', () => {
      const codereviewRules: CodereviewRules = {claimResultCode:'sample data', processMethod:'sample data', usePromatch:'sample data', pmatchKbId:1234, histChangeHoldReasn:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', origLineDenyReasn:'sample data'};
      service.updateCodereviewRules(codereviewRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCodereviewRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCodereviewRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/codereviewruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});