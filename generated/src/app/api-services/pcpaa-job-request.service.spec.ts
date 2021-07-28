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

import { PcpaaJobRequestService } from './pcpaa-job-request.service';
import { PcpaaJobRequest } from '../api-models/pcpaa-job-request.model'
import { PcpaaJobRequests } from "../api-models/testing/fake-pcpaa-job-request.model"

describe('PcpaaJobRequestService', () => {
  let injector: TestBed;
  let service: PcpaaJobRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PcpaaJobRequestService]
    });
    injector = getTestBed();
    service = injector.get(PcpaaJobRequestService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPcpaaJobRequests', () => {
    it('should return an Promise<PcpaaJobRequest[]>', () => {
      const pcpaaJobRequest = [
       {seqPcpjbId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', insertDateFrom:'2018-01-01', insertDateThru:'2018-01-01', insertByProcess:1234, action:1234, status:1234, requestType:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpjbId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', insertDateFrom:'2018-01-01', insertDateThru:'2018-01-01', insertByProcess:1234, action:1234, status:1234, requestType:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpjbId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', insertDateFrom:'2018-01-01', insertDateThru:'2018-01-01', insertByProcess:1234, action:1234, status:1234, requestType:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPcpaaJobRequests().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequests/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pcpaaJobRequest);
    });
  });


  describe('#createPcpaaJobRequest', () => {
    var id = 1;
    it('should return an Promise<PcpaaJobRequest>', () => {
      const pcpaaJobRequest: PcpaaJobRequest = {seqPcpjbId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', insertDateFrom:'2018-01-01', insertDateThru:'2018-01-01', insertByProcess:1234, action:1234, status:1234, requestType:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPcpaaJobRequest(pcpaaJobRequest).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequests`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePcpaaJobRequest', () => {
    var id = 1;
    it('should return an Promise<PcpaaJobRequest>', () => {
      const pcpaaJobRequest: PcpaaJobRequest = {seqPcpjbId:1234, jobId:'sample data', requestUser:'sample data', requestDate:'2018-01-01', insertDateFrom:'2018-01-01', insertDateThru:'2018-01-01', insertByProcess:1234, action:1234, status:1234, requestType:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePcpaaJobRequest(pcpaaJobRequest, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequests/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePcpaaJobRequest', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePcpaaJobRequest(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequests/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});