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

import { AuditPurgeJobService } from './audit-purge-job.service';
import { AuditPurgeJob } from '../api-models/audit-purge-job.model'
import { AuditPurgeJobs } from "../api-models/testing/fake-audit-purge-job.model"

describe('AuditPurgeJobService', () => {
  let injector: TestBed;
  let service: AuditPurgeJobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditPurgeJobService]
    });
    injector = getTestBed();
    service = injector.get(AuditPurgeJobService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuditPurgeJobs', () => {
    it('should return an Promise<AuditPurgeJob[]>', () => {
      const auditPurgeJob = [
       {seqAudpuId:1234, jobId:'sample data', ruleName:'sample data', status:1234, action:1234, requestType:'sample data', requestUser:'sample data', requestDate:'2018-01-01', template:'sample data', comments:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {seqAudpuId:1234, jobId:'sample data', ruleName:'sample data', status:1234, action:1234, requestType:'sample data', requestUser:'sample data', requestDate:'2018-01-01', template:'sample data', comments:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {seqAudpuId:1234, jobId:'sample data', ruleName:'sample data', status:1234, action:1234, requestType:'sample data', requestUser:'sample data', requestDate:'2018-01-01', template:'sample data', comments:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'}

      ];
      service.getAuditPurgeJobs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgejobs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(auditPurgeJob);
    });
  });


  describe('#createAuditPurgeJob', () => {
    var id = 1;
    it('should return an Promise<AuditPurgeJob>', () => {
      const auditPurgeJob: AuditPurgeJob = {seqAudpuId:1234, jobId:'sample data', ruleName:'sample data', status:1234, action:1234, requestType:'sample data', requestUser:'sample data', requestDate:'2018-01-01', template:'sample data', comments:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.createAuditPurgeJob(auditPurgeJob).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgejobs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAuditPurgeJob', () => {
    var id = 1;
    it('should return an Promise<AuditPurgeJob>', () => {
      const auditPurgeJob: AuditPurgeJob = {seqAudpuId:1234, jobId:'sample data', ruleName:'sample data', status:1234, action:1234, requestType:'sample data', requestUser:'sample data', requestDate:'2018-01-01', template:'sample data', comments:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.updateAuditPurgeJob(auditPurgeJob, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgejobs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAuditPurgeJob', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuditPurgeJob(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/auditpurgejobs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});