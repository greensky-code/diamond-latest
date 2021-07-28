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

import { PcpAutoAssignDtlService } from './pcp-auto-assign-dtl.service';
import { PcpAutoAssignDtl } from '../api-models/pcp-auto-assign-dtl.model'
import { PcpAutoAssignDtls } from "../api-models/testing/fake-pcp-auto-assign-dtl.model"

describe('PcpAutoAssignDtlService', () => {
  let injector: TestBed;
  let service: PcpAutoAssignDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PcpAutoAssignDtlService]
    });
    injector = getTestBed();
    service = injector.get(PcpAutoAssignDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPcpAutoAssignDtls', () => {
    it('should return an Promise<PcpAutoAssignDtl[]>', () => {
      const pcpAutoAssignDtl = [
       {seqPcpAutoAssgn:1234, ruleId:'sample data', procSequence:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpAutoAssgn:1234, ruleId:'sample data', procSequence:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpAutoAssgn:1234, ruleId:'sample data', procSequence:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPcpAutoAssignDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassigndtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pcpAutoAssignDtl);
    });
  });


  describe('#createPcpAutoAssignDtl', () => {
    var id = 1;
    it('should return an Promise<PcpAutoAssignDtl>', () => {
      const pcpAutoAssignDtl: PcpAutoAssignDtl = {seqPcpAutoAssgn:1234, ruleId:'sample data', procSequence:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPcpAutoAssignDtl(pcpAutoAssignDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassigndtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePcpAutoAssignDtl', () => {
    var id = 1;
    it('should return an Promise<PcpAutoAssignDtl>', () => {
      const pcpAutoAssignDtl: PcpAutoAssignDtl = {seqPcpAutoAssgn:1234, ruleId:'sample data', procSequence:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePcpAutoAssignDtl(pcpAutoAssignDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassigndtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePcpAutoAssignDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePcpAutoAssignDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpautoassigndtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});
