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

import { InstClaimHeaderRemarksService } from './inst-claim-header-remarks.service';
import { InstClaimHeaderRemarks } from '../api-models/inst-claim-header-remarks.model'
import { InstClaimHeaderRemarkss } from "../api-models/testing/fake-inst-claim-header-remarks.model"

describe('InstClaimHeaderRemarksService', () => {
  let injector: TestBed;
  let service: InstClaimHeaderRemarksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InstClaimHeaderRemarksService]
    });
    injector = getTestBed();
    service = injector.get(InstClaimHeaderRemarksService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getInstClaimHeaderRemarkss', () => {
    it('should return an Promise<InstClaimHeaderRemarks[]>', () => {
      const instClaimHeaderRemarks = [
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getInstClaimHeaderRemarkss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimheaderremarkss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(instClaimHeaderRemarks);
    });
  });


  describe('#createInstClaimHeaderRemarks', () => {
    var id = 1;
    it('should return an Promise<InstClaimHeaderRemarks>', () => {
      const instClaimHeaderRemarks: InstClaimHeaderRemarks = {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createInstClaimHeaderRemarks(instClaimHeaderRemarks).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimheaderremarkss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateInstClaimHeaderRemarks', () => {
    var id = 1;
    it('should return an Promise<InstClaimHeaderRemarks>', () => {
      const instClaimHeaderRemarks: InstClaimHeaderRemarks = {seqClaimId:1234, remarkCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateInstClaimHeaderRemarks(instClaimHeaderRemarks, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimheaderremarkss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteInstClaimHeaderRemarks', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteInstClaimHeaderRemarks(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/instclaimheaderremarkss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});