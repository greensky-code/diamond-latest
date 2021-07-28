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

import { PmbSubDetMembVolWorkService } from './pmb-sub-det-memb-vol-work.service';
import { PmbSubDetMembVolWork } from '../api-models/pmb-sub-det-memb-vol-work.model'
import { PmbSubDetMembVolWorks } from "../api-models/testing/fake-pmb-sub-det-memb-vol-work.model"

describe('PmbSubDetMembVolWorkService', () => {
  let injector: TestBed;
  let service: PmbSubDetMembVolWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubDetMembVolWorkService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubDetMembVolWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubDetMembVolWorks', () => {
    it('should return an Promise<PmbSubDetMembVolWork[]>', () => {
      const pmbSubDetMembVolWork = [
       {seqGpbilId:1234, seqSubDtlId:1234, salary:1234, memberVolume:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGpbilId:1234, seqSubDtlId:1234, salary:1234, memberVolume:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGpbilId:1234, seqSubDtlId:1234, salary:1234, memberVolume:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getPmbSubDetMembVolWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetmembvolworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubDetMembVolWork);
    });
  });


  describe('#createPmbSubDetMembVolWork', () => {
    var id = 1;
    it('should return an Promise<PmbSubDetMembVolWork>', () => {
      const pmbSubDetMembVolWork: PmbSubDetMembVolWork = {seqGpbilId:1234, seqSubDtlId:1234, salary:1234, memberVolume:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createPmbSubDetMembVolWork(pmbSubDetMembVolWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetmembvolworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubDetMembVolWork', () => {
    var id = 1;
    it('should return an Promise<PmbSubDetMembVolWork>', () => {
      const pmbSubDetMembVolWork: PmbSubDetMembVolWork = {seqGpbilId:1234, seqSubDtlId:1234, salary:1234, memberVolume:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updatePmbSubDetMembVolWork(pmbSubDetMembVolWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetmembvolworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubDetMembVolWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubDetMembVolWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubdetmembvolworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});