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

import { GroupStateMandateService } from './group-state-mandate.service';
import { GroupStateMandate } from '../api-models/group-state-mandate.model'
import { GroupStateMandates } from "../api-models/testing/fake-group-state-mandate.model"

describe('GroupStateMandateService', () => {
  let injector: TestBed;
  let service: GroupStateMandateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupStateMandateService]
    });
    injector = getTestBed();
    service = injector.get(GroupStateMandateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGroupStateMandates', () => {
    it('should return an Promise<GroupStateMandate[]>', () => {
      const groupStateMandate = [
       {seqGpstatId:1234, seqGroupId:1234, seqParentId:1234, levelCode:'sample data', mandateType:'sample data', operator:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGpstatId:1234, seqGroupId:1234, seqParentId:1234, levelCode:'sample data', mandateType:'sample data', operator:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGpstatId:1234, seqGroupId:1234, seqParentId:1234, levelCode:'sample data', mandateType:'sample data', operator:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getGroupStateMandates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/groupstatemandates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(groupStateMandate);
    });
  });


  describe('#createGroupStateMandate', () => {
    var id = 1;
    it('should return an Promise<GroupStateMandate>', () => {
      const groupStateMandate: GroupStateMandate = {seqGpstatId:1234, seqGroupId:1234, seqParentId:1234, levelCode:'sample data', mandateType:'sample data', operator:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createGroupStateMandate(groupStateMandate).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupstatemandates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGroupStateMandate', () => {
    var id = 1;
    it('should return an Promise<GroupStateMandate>', () => {
      const groupStateMandate: GroupStateMandate = {seqGpstatId:1234, seqGroupId:1234, seqParentId:1234, levelCode:'sample data', mandateType:'sample data', operator:'sample data', state:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateGroupStateMandate(groupStateMandate, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupstatemandates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGroupStateMandate', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGroupStateMandate(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/groupstatemandates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});