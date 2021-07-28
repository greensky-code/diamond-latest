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

import { PcpaaJobRequestSelService } from './pcpaa-job-request-sel.service';
import { PcpaaJobRequestSel } from '../api-models/pcpaa-job-request-sel.model'
import { PcpaaJobRequestSels } from "../api-models/testing/fake-pcpaa-job-request-sel.model"

describe('PcpaaJobRequestSelService', () => {
  let injector: TestBed;
  let service: PcpaaJobRequestSelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PcpaaJobRequestSelService]
    });
    injector = getTestBed();
    service = injector.get(PcpaaJobRequestSelService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPcpaaJobRequestSels', () => {
    it('should return an Promise<PcpaaJobRequestSel[]>', () => {
      const pcpaaJobRequestSel = [
       {seqPcpjbId:1234, seqPcpjbIdSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpjbId:1234, seqPcpjbIdSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqPcpjbId:1234, seqPcpjbIdSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPcpaaJobRequestSels().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequestsels/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pcpaaJobRequestSel);
    });
  });


  describe('#createPcpaaJobRequestSel', () => {
    var id = 1;
    it('should return an Promise<PcpaaJobRequestSel>', () => {
      const pcpaaJobRequestSel: PcpaaJobRequestSel = {seqPcpjbId:1234, seqPcpjbIdSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPcpaaJobRequestSel(pcpaaJobRequestSel).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequestsels`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePcpaaJobRequestSel', () => {
    var id = 1;
    it('should return an Promise<PcpaaJobRequestSel>', () => {
      const pcpaaJobRequestSel: PcpaaJobRequestSel = {seqPcpjbId:1234, seqPcpjbIdSel:1234, columnName:'sample data', columnOccurrence:1234, columnType:'sample data', operator:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePcpaaJobRequestSel(pcpaaJobRequestSel, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequestsels/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePcpaaJobRequestSel', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePcpaaJobRequestSel(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pcpaajobrequestsels/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});