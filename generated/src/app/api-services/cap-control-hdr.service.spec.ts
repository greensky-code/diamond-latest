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

import { CapControlHdrService } from './cap-control-hdr.service';
import { CapControlHdr } from '../api-models/cap-control-hdr.model'
import { CapControlHdrs } from "../api-models/testing/fake-cap-control-hdr.model"

describe('CapControlHdrService', () => {
  let injector: TestBed;
  let service: CapControlHdrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapControlHdrService]
    });
    injector = getTestBed();
    service = injector.get(CapControlHdrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapControlHdrs', () => {
    it('should return an Promise<CapControlHdr[]>', () => {
      const capControlHdr = [
       {capModel:'sample data', lastClosedMonth:'2018-01-01', runInProgress:'sample data', runInProgressMonth:'2018-01-01', ripFirstContractMonth:'2018-01-01', ripLastContractMonth:'2018-01-01', runInProgressDate:'2018-01-01', lastRunDate:'2018-01-01', currentRunStep:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', runInProgressJobId:1234, lastMsgJobId:1234},
       {capModel:'sample data', lastClosedMonth:'2018-01-01', runInProgress:'sample data', runInProgressMonth:'2018-01-01', ripFirstContractMonth:'2018-01-01', ripLastContractMonth:'2018-01-01', runInProgressDate:'2018-01-01', lastRunDate:'2018-01-01', currentRunStep:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', runInProgressJobId:1234, lastMsgJobId:1234},
       {capModel:'sample data', lastClosedMonth:'2018-01-01', runInProgress:'sample data', runInProgressMonth:'2018-01-01', ripFirstContractMonth:'2018-01-01', ripLastContractMonth:'2018-01-01', runInProgressDate:'2018-01-01', lastRunDate:'2018-01-01', currentRunStep:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', runInProgressJobId:1234, lastMsgJobId:1234}

      ];
      service.getCapControlHdrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capcontrolhdrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capControlHdr);
    });
  });


  describe('#createCapControlHdr', () => {
    var id = 1;
    it('should return an Promise<CapControlHdr>', () => {
      const capControlHdr: CapControlHdr = {capModel:'sample data', lastClosedMonth:'2018-01-01', runInProgress:'sample data', runInProgressMonth:'2018-01-01', ripFirstContractMonth:'2018-01-01', ripLastContractMonth:'2018-01-01', runInProgressDate:'2018-01-01', lastRunDate:'2018-01-01', currentRunStep:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', runInProgressJobId:1234, lastMsgJobId:1234};
      service.createCapControlHdr(capControlHdr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcontrolhdrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapControlHdr', () => {
    var id = 1;
    it('should return an Promise<CapControlHdr>', () => {
      const capControlHdr: CapControlHdr = {capModel:'sample data', lastClosedMonth:'2018-01-01', runInProgress:'sample data', runInProgressMonth:'2018-01-01', ripFirstContractMonth:'2018-01-01', ripLastContractMonth:'2018-01-01', runInProgressDate:'2018-01-01', lastRunDate:'2018-01-01', currentRunStep:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', runInProgressJobId:1234, lastMsgJobId:1234};
      service.updateCapControlHdr(capControlHdr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcontrolhdrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapControlHdr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapControlHdr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capcontrolhdrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});